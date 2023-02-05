export interface IListItem {
  type: string
  id: number
}

export interface IField {
  title: string
  article: string
  type: string
  null: string
  default: string
  display: boolean
  display_type: string,
  take_from: string,
  list_items: IListItem[]
  selected_item: number
  value: any
}


