import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Board } from './board.entity';
import { BoardRepository } from './boards.repository';
import { BoardCreateDto } from './dto/board.create.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    createBoard(
        user: User, boardCreateDto:BoardCreateDto
    ): Promise<Board> {
        return this.boardRepository.createBoard(user, boardCreateDto)
    }

    getBoards(
        user: User
    ): Promise<Board[]> {
       return this.boardRepository.getBoards(user)
    }
}
