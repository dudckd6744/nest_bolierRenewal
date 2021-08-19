import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.guard';
import { ReqUser } from 'src/utils/user.decorater';
import { User } from '../auth/user.entity';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { BoardCreateDto } from './dto/board.create.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}

    @Post('/')
    @UseGuards(AuthGuard)
    createBoard(
        @ReqUser() user: User,
        @Body() boardCreateDto: BoardCreateDto
    ): Promise<Board> {
        return this.boardService.createBoard(user, boardCreateDto);
    }
    
    @Get('/')
    getBoards(
        @ReqUser() user:User
    ): Promise<Board[]> {
        console.log(user)
        return this.boardService.getBoards(user);
    }
}
