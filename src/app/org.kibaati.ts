import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.kibaati{
   export class Item extends Asset {
      itemName: string;
      itemId: string;
      description: string;
      mainExchange: string;
      quantity: number;
      owner: Person;
   }
   export class Person extends Participant {
      personId: string;
      firstName: string;
      lastName: string;
      role: string;
      balance: number;
   }
   export class Trade extends Transaction {
      item: Item;
      newOwner: Person;
   }
   export class Payment extends Transaction {
      amount: number;
      sender: Person;
      recipient: Person;
   }
// }
