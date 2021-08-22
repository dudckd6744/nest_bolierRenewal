import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/utils/auth.guard";
import { ReqUser } from "src/utils/user.decorater";
import { User } from "../auth/user.entity";
import { Board } from "./board.entity";
import { BoardsService } from "./boards.service";
import { BoardCreateDto, BoardGetDto } from "./dto/board.create.dto";

@Controller("boards")
export class BoardsController {
    constructor(private boardService: BoardsService) {}

    @Post("/")
    @UseGuards(AuthGuard)
    createBoard(
        @ReqUser() user: User,
        @Body() boardCreateDto: BoardCreateDto,
    ): Promise<Board> {
        return this.boardService.createBoard(user, boardCreateDto);
    }

    @Get("/")
    getBoards(
        @Query() boardGetDto: BoardGetDto,
        @ReqUser() user: User,
    ): Promise<{ board_count: number; boards: Board[] }> {
        return this.boardService.getBoards(user, boardGetDto);
    }

    @Get("/:id")
    getDetailBoard(
        @ReqUser() user: User,
        @Param("id", ParseIntPipe) id: number,
    ): Promise<Board> {
        return this.boardService.getDetailBoard(user, id);
    }

    @Put("/:id")
    @UseGuards(AuthGuard)
    putDetailBoard(
        @ReqUser() user: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() boardCreateDto: BoardCreateDto,
    ): Promise<Board> {
        return this.boardService.putDetailBoard(user, id, boardCreateDto);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    deleteBoard(
        @ReqUser() user: User,
        @Param("id", ParseIntPipe) id: number,
    ): Promise<{ message: string }> {
        return this.boardService.deleteBoard(user, id);
    }
}
