import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource:DataSource) {
        super(Board, dataSource.createEntityManager());
    }


    async createBoard(createBoardDto:CreateBoardDto, user: User) {
        const {title, desc} = createBoardDto
    
            const board = this.create({
                title,
                desc,
                status: BoardStatus.PUBLIC,
                user
            })

            await this.save(board);
            return board
        }
}