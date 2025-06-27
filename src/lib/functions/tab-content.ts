import type { Writable } from "svelte/store"

export type TextType = 'plain' | 'heading'

export type EditableContent = {
    type: TextType
    content: string
    prev: boolean
    next: EditableContent | null
}