import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rangebar',
  templateUrl: './rangebar.component.html',
  styleUrls: ['./rangebar.component.less']
})

export class RangebarComponent implements OnInit{

  @Input() caption: string
  @Input() postfix: string

  @Input() min_value: number
  @Input() max_value: number
  @Input() current: number
  value: number

  @Output() onChanged = new EventEmitter<number>()

  ngOnInit() {
    this.value = this.current
  }
}
