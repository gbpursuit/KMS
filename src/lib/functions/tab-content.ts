export interface Style {
    type: string;       // heading, paragraph, etc..
    size: string,
    spacing: string,    // number
    color: string,      // number
    align: string       // number
}

export interface EditableContent {
    type: string
    content: string
    prev: boolean
    next: EditableContent | null,
    style: Record<string, any>;
}

export interface Tab {
    title: string,
    content: EditableContent,
}

export interface TabInterface {
    [key: string]: Tab;
};