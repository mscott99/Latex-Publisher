jest.mock("obsidian");
import { get_latex_file_contents } from "./test_utils";
import { DEFAULT_SETTINGS } from "../src/export_longform/interfaces";

describe("all inline", () => {
	test("inline", async () => {
		const result = await get_latex_file_contents(
			"inline",
			DEFAULT_SETTINGS,
		);
		expect(result)
			.toEqual(`A \\emph{emph} \\textbf{strong} \`\`quotes" \`single'
Another \\emph{emph} \\textbf{strong}
\\texttt{code} \\texttt{code\_underscore}
`);
	});

	test("inline content within quotes", async () => {
		const result = await get_latex_file_contents(
			"inline_quotes",
			DEFAULT_SETTINGS,
		);
		expect(result)
			.toEqual(`an \`\`oriented map $\\psi$ positive on $K$"
\`\`a quote with 50\\% and \\emph{emph}"
a \`single 50\\% quote'
`);
	});

	test("latex escaping", async () => {
		const result = await get_latex_file_contents(
			"latex_escaping",
			DEFAULT_SETTINGS,
		);
		expect(result)
			.toEqual(`Special characters: \\#, \\$, \\%, \\&, \\_, \\{, \\}, \\, and \\ldots{}

Math symbols: $\\infty$, $\\pm$, $\\times$, $\\neq$, $\\leq$, and $\\alpha$

Currency and others: \\euro{}, \\pounds{}, \\\copyright{}, \\checkmark{}
`);
	});
	test("citation", async () => {
		let settings = DEFAULT_SETTINGS;
		settings.default_citation_command = "othercite";
		const result = await get_latex_file_contents("citations", settings);
		expect(result)
			.toEqual(`I cite \\textcite{first}, \\textcite[p.2]{first}, \\citeyear{first}, \\othercite{first}, \\cite{second}, \\cite{second}, \\textcite{first}, \\cite{first, second}, \\othercite[Remark 1]{second}.
\\cite{hello, hi, other}
\\parencite{hello, what}
\\textcite{vershyninHighDimensionalProbabilityIntroduction2018}, \\citeyear{vershyninHighDimensionalProbabilityIntroduction2018}, \\textcite[Example 2.1]{vershyninHighDimensionalProbabilityIntroduction2018},
\\cite{berkCoherenceParameterCharacterizing2022, berkModeladaptedFourierSampling2023}, and then \\textcite{vershyninHighDimensionalProbabilityIntroduction2018}.
`);
	});
});
