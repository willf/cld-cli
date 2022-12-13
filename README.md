# cld-cli

A CLI for the [Compact Language Detector](https://github.com/google/cld3)

CLD3 is a statistical language identification library that is able to identify many languages with high accuracy.

## Requirements

- [NPM](https://www.npmjs.com/get-npm)

## Installation

```bash
script/bootstrap
```

## Usage

Note: The `cld-cli` command is aliased to `script/cld-cli` for convenience. It has to be run from this directory.

```bash
script/cld-cli --help
Usage: cld-cli cat <text> | cld-cli [global options]

Language identification CLI

Generates a language identifier for each line of the given text.

Options:
  -V, --version     output the version number
  --no-proportion   Remove proportion
  --no-reliable     Remove reliable
  --no-probability  Remove probability
  -h, --help        display help for command

```

## Examples

```bash
❯ echo "je vourdrais du savon" | script/cld-cli
{"text": "je vourdrais du savon", "language": "fr", "reliable": true, "proportion": 1, "probability": 0.90}
> cat sentences.txt | script/cld-cli --no-proportion --no-reliable
{"text": "even moar bad franch", "language":"fr", "probability": 0.83}
...
```

## License

[MIT](LICENSE)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/willf/cld-cli
