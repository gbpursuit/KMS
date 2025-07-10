export interface Style {
    type: string;       // heading, paragraph, etc..
    size: string,
    spacing: string     // number
    color: string       // number
    align: string       // number
}

export interface EditableContent {
    type: string
    disabled: boolean
    content: string
    prev: boolean
    next: EditableContent | null
    style: Style
}

export interface Tab {
    title: string,
    content: EditableContent,
    index: number
}

export interface TabInterface {
    [key: string]: Tab
};