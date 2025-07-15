import { writable, type Writable } from "svelte/store";
    
export var summarizedTable: Writable<CSVSummary> = writable({})

interface Row {
    name: string;
    degree: string;
    degreeProgram: string;
    position: string;
    gender: string;
    institution: string;
    age: number;
    yearsOfTeaching: number;
}

export interface PDFSummary { ageRange: string, commonDegree: string, commonSchool: string, yearsRange: string }

interface FullData {
    rows: Row[]
    pdfSummary: PDFSummary
}


export let fullData: Writable<FullData> = writable({
    rows: [], 
    pdfSummary: { 
        ageRange: '',
        commonDegree: '',
        commonSchool: '',
        yearsRange: '' 
    }
})

export const initFullData: FullData = {
    rows: [], 
    pdfSummary: { 
        ageRange: '',
        commonDegree: '',
        commonSchool: '',
        yearsRange: '' 
    }
}

export const summaryLabels = writable({})

export type CSVSummary = Record<string, Record<string, { averageLabel: string; rawCount: number; totalCount: number }>>

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