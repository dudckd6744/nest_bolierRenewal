import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";
import { Board } from "./board.entity";
import { BoardRepository } from "./boards.repository";
import { BoardCreateDto, BoardGetDto } from "./dto/board.create.dto";

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    createBoard(user: User, boardCreateDto: BoardCreateDto): Promise<Board> {
        return this.boardRepository.createBoard(user, boardCreateDto);
    }

    getBoards(
        user: User,
        boardGetDto: BoardGetDto,
    ): Promise<{ board_count: number; boards: Board[] }> {
        return this.boardRepository.getBoards(user, boardGetDto);
    }

    async getDetailBoard(user: User, id: number): Promise<Board> {
        const board = await this.boardRepository
            .createQueryBuilder("board")
            .where({ id })
            .leftJoinAndSelect("board.user", "user")
            .select([
                "board.id",
                "board.title",
                "board.description",
                "board.userId",
                "board.view_count",
                "board.isLike",
                "user.name",
                "board.createdAt",
            ])
            .getOne();

        if (!board)
            throw new NotFoundException("해당 게시글이 존재하지않습니다!");

        if (user) {
            board.view_count++;
            this.boardRepository.save(board);
        }

        return board;
    }

    async putDetailBoard(
        user: User,
        id: number,
        boardCreateDto: BoardCreateDto,
    ): Promise<Board> {
        const board = await this.boardRepository.findOne({ id });

        if (!board)
            throw new NotFoundException("해당 게시글이 존재하지않습니다!");
        else if (board.user != user)
            throw new UnauthorizedException("권한이 없습니다");

        return this.boardRepository.putDetailBoard(board, boardCreateDto);
    }

    async deleteBoard(user: User, id: number): Promise<{ message: string }> {
        const board = await this.boardRepository.findOne({ id });

        if (board.user != user)
            throw new UnauthorizedException("권한이 없습니다");

        const board_data = await this.boardRepository.delete({ id, user });

        if (board_data.affected == 0)
            throw new NotFoundException("해당 게시글이 존재하지않습니다!");

        return { message: "success" };
    }
}
