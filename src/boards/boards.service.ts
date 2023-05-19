import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository
        ) {}
        
        async getAllBoards() {
            return this.boardRepository.find()
        }

        async getMyBoards(user: User) {
            const query = await this.boardRepository.createQueryBuilder('board')

            query.where('board.userId = :userId', {userId: user.id})

            const boards = await query.getMany()
            
            return boards
        }
        
        createBoard(createBoardDto:CreateBoardDto, user: User): Promise<Board> {
            return this.boardRepository.createBoard(createBoardDto, user)
        }

        async getBoardById(id: number): Promise<Board> {
            const found = await this.boardRepository.findOne({where: {id}});

            if(!found) {
                throw new NotFoundException(`Can't find Board with id ${id}`)
            }
            return found
        }

        async deleteBoard(id: number) {
            const result = await this.boardRepository.delete(id);
            
            if(result.affected === 0) {
                throw new NotFoundException(`Can't find Board width id ${id}`)
            }

            return
        }

        async updateBoardStatus(id: number, status: BoardStatus) {
            const board = await this.getBoardById(id)

            board.status = status
            await this.boardRepository.save(board)
            return board
        }
    
}
