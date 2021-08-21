import { EntityRepository, RelationId, Repository } from "typeorm";
import { User } from "../auth/user.entity";
import { Board } from "./board.entity";
import { BoardCreateDto, BoardGetDto } from "./dto/board.create.dto";

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
        user:User ,
        boardGetDto: BoardGetDto
    ): Promise<{board_count:number,boards:Board[]}> {
        const { title, limit, offset } = boardGetDto;
        const title_data= title ?? ''
        const limit_data = limit ?? 2
        const offset_data = offset ?? 0

        let skip = limit_data * offset_data;

        console.log(skip)

        const board_count = await this.createQueryBuilder('board')
        .where('title LIKE :searchTerm', {searchTerm: `%${title_data}%`})
        .getCount()

        const boards = await this.createQueryBuilder('board')
        .leftJoinAndSelect('board.user', 'user')
        //검색기능
        .where('title LIKE :searchTerm', {searchTerm: `%${title_data}%`})
        .select([
            'board.id',
            'board.title',
            'board.description',
            'board.userId',
            'user.name',
            'board.createdAt'
        ])
        .limit(limit_data)
        .offset(skip)
        .orderBy('board.createdAt', 'DESC')
        .getMany()
        
        return {board_count ,boards}
    }
}