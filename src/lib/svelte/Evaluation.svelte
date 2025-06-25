<script lang="ts">
	let { children } = $props();
	let currentStep = $state(1);

	function next() {
		if (currentStep < 3) currentStep++;
	}
	function back() {
		if (currentStep > 1) currentStep--;
	}
</script>

<div class="flex w-full">
	<div class="w-full text-sm text-[#0F3923] space-y-6 bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md">
		<h1 class="flex justify-center text-2xl font-bold mb-2 text-[#1B663E]">Evaluation Form</h1>
		<div class="h-[1px] bg-[#AFAFAF] mb-4"></div>

		<!-- SECTION ONE -->
		{#if currentStep === 1}
		<section class="space-y-4">
			<h1 class="text-lg font-bold text-[#1B663E]">Section One</h1>

			<p class="text-sm mt-1 text-[#0F3923]">
				This evaluation form aims to gather information about what you have learned and experienced from the Training Workshop on Fostering 21st Century Competencies.
			</p>

			<div class="text-sm text-[#0F3923] bg-[#E9E9E9] p-3 rounded">
				<p class="mb-1">December 2023 &nbsp; | &nbsp; UP NISMED, Diliman, Quezon City</p>
				<h4 class="font-semibold mt-3">DATA PRIVACY NOTICE</h4>
				<p>UP NISMED is committed to comply with the Data Privacy Act of 2012 to protect your right to data privacy.</p>
				<p class="mt-2">By participating in this survey, UP NISMED will collect:</p>
				<ul class="list-disc list-inside pl-4">
					<li>Name</li>
					<li>Email address</li>
				</ul>
				<p class="mt-2">Data will be used for research and course improvement, stored securely for a reasonable time.</p>
			</div>

			<div class="mt-2">
				<label for="email" class="block font-semibold text-[#1B663E]">Email Address:</label>
				<input id="email" type="email" class="mt-1 p-2 border border-[#AFAFAF] rounded w-full text-sm focus:outline-[#1B663E]" placeholder="your.email@example.com" />
			</div>
		</section>
		{/if}

		<!-- SECTION TWO -->
		{#if currentStep === 2}
		<section class="space-y-4">
			<h1 class="text-lg font-bold text-[#1B663E]">Section Two: About You</h1>

			<div>
				<label for="name" class="block font-semibold text-[#1B663E]">Name (Last Name, First Name, Middle Initial):</label>
				<input id="name" type="text" class="mt-1 p-2 border border-[#AFAFAF] rounded w-full text-sm" />
			</div>

			<div>
				<p class="font-semibold text-[#1B663E] mb-1">Grade Level(s) Taught:</p>
				<div class="space-y-1 text-[#0F3923]">
					<label><input type="checkbox" class="mr-2 accent-[#1B663E]" /> Elementary</label><br />
					<label><input type="checkbox" class="mr-2 accent-[#1B663E]" /> Junior High School</label><br />
					<label><input type="checkbox" class="mr-2 accent-[#1B663E]" /> Senior High School</label><br />
					<label><input type="checkbox" class="mr-2 accent-[#1B663E]" /> Other</label>
				</div>
			</div>
		</section>
		{/if}

		<!-- SECTION THREE -->
		{#if currentStep === 3}
		<section class="space-y-6">
			<h1 class="text-lg font-bold text-[#1B663E]">Section Three: Training Workshop</h1>

			<div>
				<p class="mb-2 font-semibold text-[#1B663E]">1. Rate the course (1 = Poor, 5 = Outstanding):</p>
				<table class="w-full border text-center text-sm border-[#AFAFAF]">
					<thead class="bg-[#E9E9E9] text-[#0F3923]">
						<tr>
							<th class="border p-2 text-left">Aspect</th>
							<th class="border p-2">1</th>
							<th class="border p-2">2</th>
							<th class="border p-2">3</th>
							<th class="border p-2">4</th>
							<th class="border p-2">5</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="border p-2 text-left">Quality</td>
							{#each [1, 2, 3, 4, 5] as n}
								<td class="border"><input type="radio" name="quality" value={n} class="accent-[#1B663E]" /></td>
							{/each}
						</tr>
						<tr>
							<td class="border p-2 text-left">Relevance to teaching</td>
							{#each [1, 2, 3, 4, 5] as n}
								<td class="border"><input type="radio" name="relevance" value={n} class="accent-[#1B663E]" /></td>
							{/each}
						</tr>
						<tr>
							<td class="border p-2 text-left">Experience</td>
							{#each [1, 2, 3, 4, 5] as n}
								<td class="border"><input type="radio" name="experience" value={n} class="accent-[#1B663E]" /></td>
							{/each}
						</tr>
					</tbody>
				</table>
			</div>

			<div>
				<p class="font-semibold text-[#1B663E]">2. Describe your knowledge after the training:</p>
				<textarea rows="4" class="mt-2 w-full p-2 border border-[#AFAFAF] rounded text-sm placeholder:text-[#AFAFAF]" placeholder="Your response..."></textarea>
			</div>

			<div>
				<p class="font-semibold text-[#1B663E]">3. How well prepared are you now?</p>
				<textarea rows="4" class="mt-2 w-full p-2 border border-[#AFAFAF] rounded text-sm placeholder:text-[#AFAFAF]" placeholder="Your response..."></textarea>
			</div>
		</section>
		{/if}

		<!-- NAVIGATION -->
		<div class="flex justify-between items-center pt-6">
			{#if currentStep > 1}
				<button onclick={back} class="px-4 py-2 text-sm font-semibold bg-[#E9E9E9] text-[#0F3923] rounded hover:bg-[#D0D0D0] transition">
					Back
				</button>
			{:else}
				<span></span>
			{/if}

			{#if currentStep < 3}
				<button onclick={next} class="px-4 py-2 text-sm font-semibold bg-[#1B663E] text-white rounded hover:bg-[#155233] transition">
					Next
				</button>
			{:else}
				<button class="px-4 py-2 text-sm font-semibold bg-[#FF782D] text-white rounded hover:bg-[#e7651c] transition">
					Submit
				</button>
			{/if}
		</div>
	</div>

	{@render children?.()}
</div>
