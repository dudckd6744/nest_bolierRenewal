import { EntityRepository, RelationId, Repository } from "typeorm";
import { User } from "../auth/user.entity";
import { Board } from "./board.entity";
import { BoardCreateDto } from "./dto/board.create.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(
        user: User,
        boardCreateDto: BoardCreateDto
    ): Promise<Board> {
        const { title, description } = boardCreateDto;
        const board = await this.create({
            title,
            description,
            userId: user.id,
            // user
        })
        await this.save(board)

        const board_data = await this.createQueryBuilder('board')
        .where({ id: board.id })
        .leftJoinAndSelect('board.user', 'user')
        .select([
          'board.id',
          'board.title',
          'board.description',
          'board.userId',
          'user.name',
        ])
        .getOne();        

        return board_data       
    }

    async getBoards(
        user:User 
    ): Promise<Board[]> {
        const boards = await this.createQueryBuilder('board')
        .leftJoinAndSelect('board.user', 'user')
        .select([
            'board.id',
            'board.title',
            'board.description',
            'board.userId',
            'user.name',        
        ])
        .getMany()
        
        return boards
    }
}