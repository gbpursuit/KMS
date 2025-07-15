<script lang="ts">
    import Papa from 'papaparse';
    import Select from '../Select.svelte';
    import { onMount } from 'svelte';
	import type { EditableContent } from '$lib/functions/tab-content';
	let { filePath, parsedCSV = []}: { filePath: string, parsedCSV: Record<string, string>[]  } = $props();

    let selectedName: string = $state("Summary"); // default summary

    let csvData: Record<string, string>[] = [] 
    let nameGrouped: Record<string, Record<string, string>> = $state({});

    function getTrimmedValue(entry: Record<string, string>, target: string) {
        const matchedKey = Object.keys(entry).find(k => k.trim() === target);
        return matchedKey ? entry[matchedKey]?.trim() ?? "" : "";
    }

    async function parseCSV() {
        // Keys we want to extract (excluding first/middle/last name now)
        const fieldMap: Record<string, string> = {
            "Institution/School (please spell out, e.g. Del Pilar Elementary School)": "School/Organization",
            "Position/Designation": "Position/Designation",
            "Degree Program": "Program",
            "Do you have a Master's Degree or units earned?" : "isMaster",
            "Do you have a Doctoral Degree or units earned?" : "isDoctoral",
            "Sex assigned at birth": "Gender",
            "Age": "Age",
            "Number of years of teaching experience": "Years",
        };

        csvData = parsedCSV;
        csvData.forEach(entry => {
            const email = entry["Email Address"];
            if (!email) return;

            let cleanedEntry: Record<string, string> = {};

            // Construct fullName
            const firstName = getTrimmedValue(entry, "First Name");
            const middleInitial = getTrimmedValue(entry, "Middle Initial");
            const lastName = getTrimmedValue(entry, "Last Name");
            const fullName = [firstName, middleInitial, lastName].filter(Boolean).join(" ");

            cleanedEntry['Name'] = getTrimmedValue(entry, "NAME (Please type your name as you would like it to appear on your certificate)");
            cleanedEntry["Full Name"] = fullName;

            // Add other fields
            for (const [originalKey, newKey] of Object.entries(fieldMap)) {
                const matchedKey = Object.keys(entry).find(k => k.trim() === originalKey.trim());
                if (matchedKey) {
                    cleanedEntry[newKey] = entry[matchedKey]?.trim() ?? '';
                }
            }

            nameGrouped[email] = cleanedEntry;
        });
    }

    function getAgeRange(age: number): string {
        if (age < 20) return "Below 20";
        if (age < 30) return "20–29";
        if (age < 40) return "30–39";
        if (age < 50) return "40–49";
        if (age < 60) return "50–59";
        return "60+";
    }

    function getDegree([hasMasters, hasDoctoral]: [string, string]): string {
        if (hasDoctoral.toLowerCase() === 'yes') return "Doctoral Degree";
        if (hasMasters.toLowerCase() === 'yes') return "Master's Degree";
        return "Bachelor's Degree";
    }

	function getYearsRange(years: number): string {
		if (years < 1) return "Less than 1 year";
		if (years < 5) return "1–4 years";
		if (years < 10) return "5–9 years";
		if (years < 20) return "10–19 years";
		return "20+ years";
	}

    function getSummaryData() {
        const rows: {
            name: string;
            degree: string;
            degreeProgram: string;
            position: string;
            gender: string;
            institution: string;
            age: number;
            yearsOfTeaching: number;
        }[] = [];

        const degreeCount: Record<string, number> = {};
        const schoolCount: Record<string, number> = {};
        let totalAge = 0;
        let totalYears = 0;
        let validAges = 0;
        let validYears = 0;

        Object.values(nameGrouped).forEach(entry => {
            const name = getTrimmedValue(entry, "Full Name");

            const degree = getDegree([
                getTrimmedValue(entry, "isMaster"),
                getTrimmedValue(entry, "isDoctoral"),
            ]);

            const degreeProgram = getTrimmedValue(entry, "Program");
            const position = getTrimmedValue(entry, "Position/Designation");
            const gender = getTrimmedValue(entry, "Gender");
            const institution = getTrimmedValue(entry, "School/Organization");

            const age = parseInt(getTrimmedValue(entry, "Age"));
            const validAge = !isNaN(age);
            if (validAge) {
                totalAge += age;
                validAges++;
            }

            const yearsRaw = getTrimmedValue(entry, "Years");
            const years = parseInt(yearsRaw);
            const yearsOfTeaching = !isNaN(years) ? years : 0;
            if (!isNaN(years)) {
                totalYears += years;
                validYears++;
            }

            degreeCount[degree] = (degreeCount[degree] ?? 0) + 1;
            schoolCount[institution] = (schoolCount[institution] ?? 0) + 1;

            rows.push({
                name,
                degree,
                degreeProgram,
                position,
                gender,
                institution,
                age: validAge ? age : 0,
                yearsOfTeaching
            });

            
        });

        const avgAge = validAges > 0 ? totalAge / validAges : 0;
        const avgYears = validYears > 0 ? totalYears / validYears : 0;

        const ageRange = getAgeRange(avgAge);
        const commonDegree = Object.entries(degreeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Unknown";
        const commonSchool = Object.entries(schoolCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Unknown";
        const yearsRange = getYearsRange(avgYears);

        const pdfSummary = {
            ageRange,
            commonDegree,
            commonSchool,
            yearsRange
        };

        return {
            rows,
            pdfSummary
        };
    }

    $effect(() => {
        if (filePath) {
            parseCSV();
        } else {
            csvData = [];
            nameGrouped = {};
            selectedName = "Summary";
        }
    });

    let selectOptions = $derived(() => ['Summary', ...Object.keys(nameGrouped).sort()]);
    let fullData = $derived(() => getSummaryData());
    let pdfSummary = $derived(() => fullData().pdfSummary);
    let detailedSummary = $derived(() => fullData().rows);

    type SummaryReturn = ReturnType<typeof detailedSummary>; 
    type Summary = SummaryReturn[number];                    
    type SummaryKeys = keyof Summary;

    const detailedLabels: Record<SummaryKeys, string> = {
        name: "Name",
        degree: "Degree",
        degreeProgram: "Program",
        position: "Position",
        gender: "Gender",
        institution: "Institution",
        age: "Age",
        yearsOfTeaching: "Years"
    };

    const pdfLabels: Record<keyof ReturnType<typeof pdfSummary>, string> = {
        ageRange: "Age Range",
        commonDegree: "Most Common Degree",
        commonSchool: "Most Common School",
        yearsRange: "Years of Teaching"
    };

    const summaryLabels = {
        ...detailedLabels,
        ...pdfLabels
    };


</script>

{#if selectedName && filePath}
    <Select style = 'evaluation' options={selectOptions()} disabled={false} bind:selected={selectedName} placeholder="a respondent" />
    {#if selectedName === 'Summary'}
        <div class="max-w-3xl mx-auto mt-6 p-5 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">

            <h1 class="text-2xl font-bold text-[var(--font-green)] border-b border-gray-200 pb-2"> Total of {Object.keys(nameGrouped).length} Participants </h1>
            <div class="space-y-6">
                <table class="w-full min-w-[500px] table-fixed text-sm border rounded overflow-hidden shadow-md">
                    <thead class="bg-[var(--font-green)] text-white">
                        <tr>
                            {#each Object.keys(detailedSummary()[0] ?? {}).filter(key => key !== 'degree') as key}
                                <th class="text-center p-2 {key === 'name' ? 'w-[180px] min-w-[180px] text-left' : 
                                    key === 'degreeProgram' ? 'w-[120px] min-w-[120px] text-left' : ''}">
                                    <div class = "overflow-hidden truncate" title={summaryLabels[key as keyof typeof summaryLabels]}>
                                        <span class="font-bold">{summaryLabels[key as keyof typeof summaryLabels]}</span>
                                    </div>
                                </th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#each detailedSummary() as row}
                            <tr class="odd:bg-white even:bg-gray-100 font-normal hover:text-[var(--hover-green)] transition-all duration-300 ease-in-out">
                                <td class="tdStyle">
                                    <div class="tdClamp name" title={row.name}>
                                        <span class="font-semibold">{row.name}</span>
                                        <span class="text-gray-500 italic text-xs block"> ({row.degree})</span>
                                    </div>
                                </td>
                                <td class="tdStyle">
                                    <div class="tdClamp notName" title={row.degreeProgram}>{row.degreeProgram}</div>
                                </td>
                                <td class="tdStyle">
                                    <div class="tdClamp notName" title={row.position}>{row.position}</div>
                                </td>
                                <td class="tdStyle">
                                    <div class="tdClamp notName" title={row.gender}>{row.gender}</div>
                                </td>
                                <td class="tdStyle">
                                    <div class="tdClamp notName" title={row.institution}>{row.institution}</div>
                                </td>
                                <td class="tdStyle">
                                    <div class="tdClamp notName" title={(row.age).toString()}>{row.age}</div>
                                </td>
                                <td class="tdStyle">
                                    <div class="tdClamp notName" title={row.yearsOfTeaching.toString()}>{row.yearsOfTeaching}</div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                <div class="flex flex-col gap-1 border-l-4 border-[var(--font-green)] bg-gray-50 rounded-md p-4 shadow-sm transition-shadow">
                    <h1 class="text-2xl font-bold text-[var(--font-green)] border-b border-gray-200 pb-2">
                        In summary:
                    </h1>
                    {#each Object.entries(pdfSummary()) as [label, value]}
                        <div class="flex items-center">
                            <h2 class="text-base font-semibold p-2">
                                {summaryLabels[label as keyof typeof summaryLabels]}:
                            </h2>
                            <p class="text-gray-900 py-2 rounded">{value}</p>
                        </div>                        
                    {/each}
                </div>
            </div>
        </div>
    {:else}
        <div class="max-w-3xl mx-auto mt-6 p-5 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">

            <h1 class="text-2xl font-bold text-[var(--font-green)] border-b border-gray-200 pb-2"> {nameGrouped[selectedName]['Name']}'s Response </h1>

            <div class="space-y-6">
                <table class="w-full min-w-[500px]  table-fixed text-sm border rounded overflow-hidden shadow-md">
                    <thead class="bg-[var(--font-green)] text-white">
                        <tr>
                            <th class="text-center p-2 w-1/2">Category</th>
                            <th class="text-center p-2 w-1/2">Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each Object.entries(nameGrouped[selectedName]) as [group, items]}
                            <tr class="odd:bg-white even:bg-gray-100 font-normal hover:text-[var(--hover-green)]
                                transition-all duration-300 ease-in-out ">
                                <td class="text-left border border-gray-200 px-4 py-2">{group}</td>
                                <td class="text-center border border-gray-200 p-2">{items}</td>
                            </tr> 
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
{/if}

<style>
    .tdStyle {
        padding: 0.75rem 1rem;       
        border: 1px solid #E5E7EB;  
        text-align: left;          
    }

    .tdClamp {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        white-space: normal;
    }

    .tdClamp.name {
        line-clamp: 4;
        -webkit-line-clamp: 4;       
    }

    .tdClamp.notName {
        line-clamp: 2;
        -webkit-line-clamp: 2;      
    }
</style>