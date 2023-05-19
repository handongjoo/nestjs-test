import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController')
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(){
        return this.boardsService.getAllBoards();
    }

    @Get('/myBoards')
    getMyBoards(
        @GetUser() user: User
        ) {
            this.logger.verbose(`User ${user.username} trying to get One's boards`)
            return this.boardsService.getMyBoards(user)
    }


    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto:CreateBoardDto,
        @GetUser() user: User
        ) {
            this.logger.verbose(`User ${user.username} create a new board. Payload: ${JSON.stringify(createBoardDto)}`)
            return this.boardsService.createBoard(createBoardDto, user)
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number) {
        return this.boardsService.getBoardById(id)
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number) {
        this.boardsService.deleteBoard(id)
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status)
    }
}
