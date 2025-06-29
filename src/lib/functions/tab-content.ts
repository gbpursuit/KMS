export interface EditableContent {
    type: string
    content: string
    prev: boolean
    next: EditableContent | null
}

export interface Tab {
    title: string,
    content: EditableContent
}

export interface TabInterface {
    [key: string]: Tab;
};