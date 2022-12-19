import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WebSocketConnector} from "./WebSocketConnector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'websocketFront';

  items: any[] = [];
  private webSocketConnector: WebSocketConnector | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.webSocketConnector = new WebSocketConnector(
      'http://localhost:8080/socket',
      '/statusProcessor',
      this.onMessage.bind(this)
    );
  }

  onMessage(message: any): void {
    console.log("!!!Conteudo da mensagem: ",message.body);
    this.items.push(message.body);
  }

  socket() {
    console.log("!!!socket clicked");
    this.http.put('http://localhost:8080/api', {})
      .subscribe(response => console.log("response"));
  }
}
