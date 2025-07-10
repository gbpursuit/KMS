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
    style: Record<string, any>;
}

export interface Tab {
<<<<<<< Updated upstream
    title: string,
    content: EditableContent,
    index: number
=======
    title: string
    content: EditableContent
>>>>>>> Stashed changes
}

export interface TabInterface {
    [key: string]: Tab
};