import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { take } from 'rxjs/operators';
import * as OverlayScrollbars from 'overlayscrollbars'

@Component({
  selector: 'app-os-version',
  templateUrl: './os-version.component.html',
  styleUrls: ['./os-version.component.scss']
})
export class OsVersionComponent implements OnInit {

  @ViewChild('chatlogBox') chatlogBox: ElementRef<HTMLDivElement>;
  @ViewChildren('messageEl') messageElements: QueryList<any>;

  messages: string[];

  scrollbarInstance: OverlayScrollbars;


  constructor() { }

  ngOnInit() {
    this.messages = new Array<string>();

    for (let i = 50; i > 0; i--) {
      this.messages.push(i.toString());
    }

    // Initialize OverlayScrollbars
    this.scrollbarInstance = OverlayScrollbars(this.chatlogBox.nativeElement, {
      callbacks: {
        onScroll: () => {
          this.onChatlogBoxScroll();
        }
      }
    })
    
    setTimeout(() => {
      this.scrollbarInstance = OverlayScrollbars(this.chatlogBox.nativeElement, {
        callbacks: {
          onScroll: () => {
            this.onChatlogBoxScroll();
          }
        }
      })
    }, 1);
  }

  initOverlayScrollbars() {
    this.scrollbarInstance = OverlayScrollbars(this.chatlogBox.nativeElement, {
      callbacks: {
        onScroll: () => {
          this.onChatlogBoxScroll();
        }
      }
    })
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


  onChatlogBoxScroll() {
    console.log("OS Version :: ChatlogBox Scroll")
    let scrollTop = this.scrollbarInstance.scroll().position.y;
    if (scrollTop == 0) {
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

    /**
     * The only change I made was to get scrollTop from scrollbarInstance
     * thats it :)
     */
  }


  prependMessage(message: string) {
    console.log("PREPENDING MESSAGES")

    // Store reference to top message
    let firstMsg: HTMLDivElement = <HTMLDivElement>this.messageElements.first.nativeElement;

    // Store current scroll/offset
    let scrollTop = this.scrollbarInstance.scroll().position.y;
    let curOffset = firstMsg.offsetTop - scrollTop;

    // Prepend the message to the messages array (using unshift)
    this.messages.unshift(message);

    this.messageElements.changes
      .pipe(take(1))
      .subscribe(() => {
        let scrollVal = firstMsg.offsetTop - curOffset;
        // this.chatlogBox.nativeElement.scrollTop = scrollVal;
        this.scrollbarInstance.scroll({ y: scrollVal });
      });
  }

}
