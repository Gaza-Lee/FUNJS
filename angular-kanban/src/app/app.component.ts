import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

interface Card { id: number; text: string; }

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  columns = [
    { name: "Todo", cards: [] as Card[] },
    { name: "Doing", cards: [] as Card[] },
    { name: "Done", cards: [] as Card[] },
  ];
  newText = "";
  targetCol = 0;

  addCard() {
    if (!this.newText.trim()) return;
    this.columns[this.targetCol].cards.push({ id: Date.now(), text: this.newText });
    this.newText = "";
  }
  move(card: Card, from: number, to: number) {
    this.columns[from].cards = this.columns[from].cards.filter(c => c.id !== card.id);
    this.columns[to].cards.push(card);
  }
  remove(card: Card, col: number) {
    this.columns[col].cards = this.columns[col].cards.filter(c => c.id !== card.id);
  }
}
