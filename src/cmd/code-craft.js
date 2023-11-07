import inquirer from 'inquirer';
import { TicketDraw } from '../ticket-draw.js';
import { TicketGenerator } from '../ticket-generator.js';
import { TicketSeller } from '../ticket-seller.js';

/**
 * Commander class to initialize a party
 */
export class CodeCraft {
  ticketGenerator = new TicketGenerator();
  ticketSeller;
  ticketDraw;

  constructor() {
    this.ticketSeller = new TicketSeller(this.ticketGenerator.tickets);
  }

  initializeParty() {
    const promptAction = {
      type: 'list',
      name: 'action',
      message: 'Which action would you like to execute ?',
      choices: ['purchase', 'draw', 'winners'],
    };
    inquirer.prompt(promptAction).then((answers) => {
      if (answers.action === 'purchase') {
        this.purchase();
      }

      if (answers.action === 'draw') {
        this.draw();
      }

      if (answers.action === 'winners') {
        this.winners();
      }
    });
  }

  purchase() {
    const questions = [
      {
        type: 'input',
        name: 'playerName',
        message: 'Enter the player name or Enter exit or press Enter to exit',
      },
    ];
    inquirer.prompt(questions).then((answers) => {
      const { playerName } = answers;
      if (!playerName || playerName === 'exit') {
        this.initializeParty();
      }
      if (playerName) {
        this.purchaseTicketTo(playerName);
        this.purchase();
      }
    });
  }

  purchaseTicketTo(playerName) {
    const player = this.ticketSeller.purchase(playerName);
    console.log(`[${player.name}] : [${player.ticket}]\t\n`);
  }

  initializeDraw() {
    if (this.ticketSeller.players.length <= 3) {
      //
      console.log('You should purchase ticket for more than 3 players');
      process.exit(1);
    }
    this.ticketDraw = new TicketDraw(this.ticketSeller.players);
  }

  draw() {
    if (!this.ticketDraw) {
      this.initializeDraw();
    }
    this.ticketDraw.draw();

    const questions = [
      {
        type: 'confirm',
        name: 'printWinner',
        message:
          'Would you like to print the winners (just hit enter for YES)?',
        default: true,
      },
    ];
    inquirer.prompt(questions).then((answers) => {
      if (answers.printWinner) {
        this.winners();
      }

      if (!answers.printWinner) {
        const promptActionAvailable = {
          type: 'list',
          name: 'availableAction',
          message: 'Which action would you like to execute ?',
          choices: ['draw', 'winners', 'exit'],
        };
        inquirer.prompt(promptActionAvailable).then((answers) => {
          if (answers.availableAction === 'draw') {
            this.draw();
          }

          if (answers.availableAction === 'winners') {
            this.winners();
          }

          if (answers.availableAction === 'exit') {
            console.log('Good bye');
          }
        });
      }
    });
  }

  winners() {
    if (!this.ticketDraw) {
      this.initializeDraw();
    }
    if (this.ticketDraw.winners.length === 0) {
      this.ticketDraw.draw();
    }
    this.ticketDraw.printResult();
  }
}
