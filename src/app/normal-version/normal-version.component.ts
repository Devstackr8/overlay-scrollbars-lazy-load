import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-normal-version',
  templateUrl: './normal-version.component.html',
  styleUrls: ['./normal-version.component.scss']
})
export class NormalVersionComponent implements OnInit {

  @ViewChild('chatlogBox') chatlogBox: ElementRef<HTMLDivElement>;
  @ViewChildren('messageEl') messageElements: QueryList<any>;

  messages: string[];

  constructor() { }

  ngOnInit() {
    this.messages = new Array<string>();

    for (let i = 50; i > 0; i--) {
      this.messages.push(i.toString());
    }
  }

  onChatlogBoxScroll() {
    console.log("hi")
    if (this.chatlogBox.nativeElement.scrollTop == 0) {
      // user is scrolled to the top of the messages box

      let moreMessages = this.getMoreMessages();

      // Prepend messages after 350ms - makes it easier to see

      setTimeout(() => {
        // prepend these messages to the messages div

        moreMessages.reverse();

        for (let i = 0; i < moreMessages.length; i++) {
          this.prependMessage(moreMessages[i]);
        }
      }, 500);


    }
  }


  getMoreMessages() {
    let lastNumber = parseInt(this.messages[0]);
    let newLastNumber = lastNumber + 50; // so 50 more messages
    let messages: string[] = [];
    for (let i = newLastNumber; i > lastNumber; i--) {
      messages.push(i.toString());
    }

    return messages;
  }

  prependMessage(message: string) {
    // Store reference to top message
    let firstMsg: HTMLDivElement = <HTMLDivElement>this.messageElements.first.nativeElement;

    // Store current scroll/offset
    let curOffset = firstMsg.offsetTop - this.chatlogBox.nativeElement.scrollTop;

    // Prepend the message to the messages array (using unshift)
    this.messages.unshift(message);

    this.messageElements.changes
      .pipe(take(1))
      .subscribe(() => {
        let scrollVal = firstMsg.offsetTop - curOffset;
        this.chatlogBox.nativeElement.scrollTop = scrollVal;
      });
  }
}