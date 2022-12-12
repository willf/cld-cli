import { Command, OptionValues } from 'commander';
import { loadModule } from 'cld3-asm';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import stringify from "json-stringify-pretty-compact";

const program = new Command();

interface CldResult {
  text: string;
  language: string;
  reliable?: boolean,
  proportion?: number,
  probability?: number
}

const main = async (options: OptionValues ) => {
  const factory = await loadModule();
  const identifier = factory.create(0, 10000);
  const reader = readline.createInterface({
    input: stdin,
    output: stdout,
    terminal: false
  });
  reader.on("line", data => {
    var result = identifier.findLanguage(data);
    var r : CldResult = { "text": data, language: result.language, "reliable": result.is_reliable, "proportion": result.proportion, "probability": result.probability }
    if (!options.proportion) {
      delete r.proportion;
    }
    if (!options.reliable) {
      delete r.reliable;
    }
    if (!options.probability) {
      delete r.probability;
    }
    const str_options = { "maxLength": 0, "indent": 0}
    process.stdout.write(stringify(r, str_options) + "\n");
 })
};


program
  .name("cld-cli")
  .usage("cat <text> | cld-cli [global options]")
  .version("1.0.0")
  .description("Language identification CLI\n\nGenerates a language identifier for each line of the given text.")
  .option('--no-proportion', 'Remove proportion')
  .option('--no-reliable', 'Remove reliable')
  .option('--no-probability', 'Remove probability')
  .parse(process.argv);

const options = program.opts();

main(options);
