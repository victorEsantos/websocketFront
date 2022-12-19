import * as SockJS from "sockjs-client";
import * as StompJs from "stompjs";

export class WebSocketConnector {

  private stompClient: any;

  constructor(private webSocketEndPoint: string,
              private topic: string,
              private onMessage: Function) {

    this.connect();
  }

  private connect() {
    console.log("!!!Iniciando nova conexao em: ", this.webSocketEndPoint);
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = StompJs.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(this.topic, (event: any) => {
        this.onMessage(event);
      });
    }, this.onError.bind(this));
  };

  private onError(error: string) {
    console.log("Error while connect: " + error);
    setTimeout(() => {
      console.log("Trying to connect again...");
      this.connect();
    }, 3000);
  }
}
