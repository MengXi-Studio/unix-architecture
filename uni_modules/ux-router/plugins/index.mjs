var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/constants.js"(exports, module) {
    "use strict";
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DEFAULT_MAX_EXTGLOB_RECURSION = 0;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var SEP = "/";
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
      SEP
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
      SEP: "\\"
    };
    var POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars2) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars2.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.isWindows = () => {
      if (typeof navigator !== "undefined" && navigator.platform) {
        const platform = navigator.platform.toLowerCase();
        return platform === "win32" || platform === "windows";
      }
      if (typeof process !== "undefined" && process.platform) {
        return process.platform === "win32";
      }
      return false;
    };
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
    exports.basename = (path4, { windows } = {}) => {
      const segs = path4.split(windows ? /[\\/]/ : "/");
      const last = segs[segs.length - 1];
      if (last === "") {
        return segs[segs.length - 2];
      }
      return last;
    };
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/scan.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.tokens === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              let parens = 0;
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  advance();
                  continue;
                }
                if (code === CHAR_LEFT_PARENTHESES) {
                  parens++;
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES && --parens === 0) {
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            let parens = 1;
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                advance();
                continue;
              }
              if (code === CHAR_LEFT_PARENTHESES) {
                parens++;
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES && --parens === 0) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n2 = prevIndex !== void 0 ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value2 = input.slice(n2, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value2;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (i >= start) {
            parts.push(value2);
            prevIndex = i;
          }
        }
        const n = prevIndex !== void 0 ? prevIndex + 1 : start;
        const value = input.slice(n);
        parts.push(value);
        if (opts.tokens && prevIndex && prevIndex + 1 < input.length) {
          tokens[tokens.length - 1].value = value;
          depth(tokens[tokens.length - 1]);
          state.maxDepth += tokens[tokens.length - 1].depth;
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/parse.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var splitTopLevel = (input) => {
      const parts = [];
      let bracket = 0;
      let paren = 0;
      let quote2 = 0;
      let value = "";
      let escaped = false;
      for (const ch of input) {
        if (escaped === true) {
          value += ch;
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          value += ch;
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote2 = quote2 === 1 ? 0 : 1;
          value += ch;
          continue;
        }
        if (quote2 === 0) {
          if (ch === "[") {
            bracket++;
          } else if (ch === "]" && bracket > 0) {
            bracket--;
          } else if (bracket === 0) {
            if (ch === "(") {
              paren++;
            } else if (ch === ")" && paren > 0) {
              paren--;
            } else if (ch === "|" && paren === 0) {
              parts.push(value);
              value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      parts.push(value);
      return parts;
    };
    var isPlainBranch = (branch) => {
      let escaped = false;
      for (const ch of branch) {
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch)) {
          return false;
        }
      }
      return true;
    };
    var normalizeSimpleBranch = (branch) => {
      let value = branch.trim();
      let changed = true;
      while (changed === true) {
        changed = false;
        if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
          value = value.slice(2, -1);
          changed = true;
        }
      }
      if (!isPlainBranch(value)) {
        return;
      }
      return value.replace(/\\(.)/g, "$1");
    };
    var hasRepeatedCharPrefixOverlap = (branches) => {
      const values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
          const a = values[i];
          const b = values[j];
          const char = a[0];
          if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) {
            continue;
          }
          if (a === b || a.startsWith(b) || b.startsWith(a)) {
            return true;
          }
        }
      }
      return false;
    };
    var parseRepeatedExtglob = (pattern, requireEnd = true) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") {
        return;
      }
      let bracket = 0;
      let paren = 0;
      let quote2 = 0;
      let escaped = false;
      for (let i = 1; i < pattern.length; i++) {
        const ch = pattern[i];
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote2 = quote2 === 1 ? 0 : 1;
          continue;
        }
        if (quote2 === 1) {
          continue;
        }
        if (ch === "[") {
          bracket++;
          continue;
        }
        if (ch === "]" && bracket > 0) {
          bracket--;
          continue;
        }
        if (bracket > 0) {
          continue;
        }
        if (ch === "(") {
          paren++;
          continue;
        }
        if (ch === ")") {
          paren--;
          if (paren === 0) {
            if (requireEnd === true && i !== pattern.length - 1) {
              return;
            }
            return {
              type: pattern[0],
              body: pattern.slice(2, i),
              end: i
            };
          }
        }
      }
    };
    var buildCharClassStar = (chars2) => {
      const source = chars2.length === 1 ? utils.escapeRegex(chars2[0]) : `[${chars2.map((ch) => utils.escapeRegex(ch)).join("")}]`;
      return `${source}*`;
    };
    var getStarExtglobSequenceChars = (pattern) => {
      let index = 0;
      const chars2 = [];
      while (index < pattern.length) {
        const match = parseRepeatedExtglob(pattern.slice(index), false);
        if (!match || match.type !== "*") {
          return;
        }
        const branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1) {
          return;
        }
        const branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1) {
          return;
        }
        chars2.push(branch);
        index += match.end + 1;
      }
      if (chars2.length < 1) {
        return;
      }
      return chars2;
    };
    var repeatedExtglobRecursion = (pattern) => {
      let depth = 0;
      let value = pattern.trim();
      let match = parseRepeatedExtglob(value);
      while (match) {
        depth++;
        value = match.body.trim();
        match = parseRepeatedExtglob(value);
      }
      return depth;
    };
    var analyzeRepeatedExtglob = (body, options) => {
      if (options.maxExtglobRecursion === false) {
        return { risky: false };
      }
      const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
      const branches = splitTopLevel(body).map((branch) => branch.trim());
      if (branches.length > 1) {
        if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) {
          return { risky: true };
        }
      }
      const safeChars = [];
      let sawStarSequence = false;
      let combinable = true;
      for (const branch of branches) {
        const chars2 = getStarExtglobSequenceChars(branch);
        if (chars2) {
          sawStarSequence = true;
          safeChars.push(...chars2);
          continue;
        }
        const literal = normalizeSimpleBranch(branch);
        if (literal && literal.length === 1) {
          safeChars.push(literal);
          continue;
        }
        combinable = false;
        if (repeatedExtglobRecursion(branch) > max) {
          return { risky: true };
        }
      }
      if (sawStarSequence) {
        return combinable ? { risky: true, safeOutput: buildCharClassStar([...new Set(safeChars)]) } : { risky: true };
      }
      return { risky: false };
    };
    var parse4 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const PLATFORM_CHARS = constants.globChars(opts.windows);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.output = (prev.output || prev.value) + tok.value;
          prev.value += tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        token.startIndex = state.index;
        token.tokensIndex = tokens.length;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        const literal = input.slice(token.startIndex, state.index + 1);
        const body = input.slice(token.startIndex + 2, state.index);
        const analysis = analyzeRepeatedExtglob(body, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
          const open = tokens[token.tokensIndex];
          open.type = "text";
          open.value = literal;
          open.output = safeOutput || utils.escapeRegex(literal);
          for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
            tokens[i].value = "";
            tokens[i].output = "";
            delete tokens[i].suffix;
          }
          state.output = token.output + open.output;
          state.backtrack = true;
          push({ type: "paren", extglob: true, value, output: "" });
          decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse4(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars2, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars2.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars2.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          const isEnd = eos() || state.parens > 0 && rest === ")".repeat(state.parens) && !extglobs.some((extglob) => extglob.type === "negate");
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && isEnd) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse4.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(opts.windows);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse4;
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    "use strict";
    var scan = require_scan();
    var parse4 = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject2 = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch2 = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch2(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject2(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = opts.windows;
      const regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix });
        const result = { glob, state, regex, posix, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch2.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch2.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch2.matchBase = (input, glob, options, posix = options && options.windows) => {
      const regex = glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options);
      return regex.test(utils.basename(input, { windows: posix }));
    };
    picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
    picomatch2.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch2.parse(p, options));
      return parse4(pattern, { ...options, fastpaths: false });
    };
    picomatch2.scan = (input, options) => scan(input, options);
    picomatch2.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch2.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse4.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse4(input, options);
      }
      return picomatch2.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch2.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch2.constants = constants;
    module.exports = picomatch2;
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.7/node_modules/picomatch/index.js"(exports, module) {
    "use strict";
    var pico = require_picomatch();
    var utils = require_utils();
    function picomatch2(glob, options, returnState = false) {
      if (options && (options.windows === null || options.windows === void 0)) {
        options = { ...options, windows: utils.isWindows() };
      }
      return pico(glob, options, returnState);
    }
    Object.assign(picomatch2, pico);
    module.exports = picomatch2;
  }
});

// ../../node_modules/.pnpm/unplugin@3.4.0_esbuild@0.27.7_rollup@4.63.4_vite@5.4.21_@types+node@20.19.43_terser@5.51.2_/node_modules/unplugin/dist/parse-B1HhnTCu.mjs
var import_picomatch = __toESM(require_picomatch2(), 1);
import { resolve } from "path";
function toArray(array) {
  array = array || [];
  if (Array.isArray(array)) return array;
  return [array];
}
var BACKSLASH_REGEX = /\\/g;
function normalize$1(path4) {
  return path4.replace(BACKSLASH_REGEX, "/");
}
var ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Z]:)?[/\\|])/i;
function isAbsolute$1(path4) {
  return ABSOLUTE_PATH_REGEX.test(path4);
}
function getMatcherString(glob, cwd) {
  if (glob.startsWith("**") || isAbsolute$1(glob)) return normalize$1(glob);
  return normalize$1(resolve(cwd, glob));
}
function patternToIdFilter(pattern) {
  if (pattern instanceof RegExp) return (id) => {
    const normalizedId = normalize$1(id);
    const result = pattern.test(normalizedId);
    pattern.lastIndex = 0;
    return result;
  };
  const glob = getMatcherString(pattern, process.cwd());
  const matcher = (0, import_picomatch.default)(glob, { dot: true });
  return (id) => {
    const normalizedId = normalize$1(id);
    return matcher(normalizedId);
  };
}
function patternToCodeFilter(pattern) {
  if (pattern instanceof RegExp) return (code) => {
    const result = pattern.test(code);
    pattern.lastIndex = 0;
    return result;
  };
  return (code) => code.includes(pattern);
}
function createFilter(exclude, include) {
  if (!exclude && !include) return;
  return (input) => {
    if (exclude?.some((filter) => filter(input))) return false;
    if (include?.some((filter) => filter(input))) return true;
    return !(include && include.length > 0);
  };
}
function normalizeFilter(filter) {
  if (typeof filter === "string" || filter instanceof RegExp) return { include: [filter] };
  if (Array.isArray(filter)) return { include: filter };
  return {
    exclude: filter.exclude ? toArray(filter.exclude) : void 0,
    include: filter.include ? toArray(filter.include) : void 0
  };
}
function createIdFilter(filter) {
  if (!filter) return;
  const { exclude, include } = normalizeFilter(filter);
  const excludeFilter = exclude?.map(patternToIdFilter);
  const includeFilter = include?.map(patternToIdFilter);
  return createFilter(excludeFilter, includeFilter);
}
function createCodeFilter(filter) {
  if (!filter) return;
  const { exclude, include } = normalizeFilter(filter);
  const excludeFilter = exclude?.map(patternToCodeFilter);
  const includeFilter = include?.map(patternToCodeFilter);
  return createFilter(excludeFilter, includeFilter);
}
function createFilterForId(filter) {
  const filterFunction = createIdFilter(filter);
  return filterFunction ? (id) => !!filterFunction(id) : void 0;
}
function createFilterForTransform(idFilter, codeFilter) {
  if (!idFilter && !codeFilter) return;
  const idFilterFunction = createIdFilter(idFilter);
  const codeFilterFunction = createCodeFilter(codeFilter);
  return (id, code) => {
    let fallback = true;
    if (idFilterFunction) fallback &&= idFilterFunction(id);
    if (!fallback) return false;
    if (codeFilterFunction) fallback &&= codeFilterFunction(code);
    return fallback;
  };
}
function normalizeObjectHook(name, hook) {
  let handler;
  let filter;
  if (typeof hook === "function") handler = hook;
  else {
    handler = hook.handler;
    const hookFilter = hook.filter;
    if (name === "resolveId" || name === "load") filter = createFilterForId(hookFilter?.id);
    else {
      const transformFilter = hookFilter;
      filter = createFilterForTransform(transformFilter?.id, transformFilter?.code);
    }
  }
  return {
    handler,
    filter: filter || (() => true)
  };
}
var parseImpl;
function parse(code, opts = {}) {
  if (!parseImpl) throw new Error("Parse implementation is not set. Please call setParseImpl first.");
  return parseImpl(code, opts);
}

// ../../node_modules/.pnpm/unplugin@3.4.0_esbuild@0.27.7_rollup@4.63.4_vite@5.4.21_@types+node@20.19.43_terser@5.51.2_/node_modules/unplugin/dist/webpack-like-BQ10QW9c.mjs
import { isAbsolute, normalize } from "path";
function transformUse(data, plugin, transformLoader) {
  if (data.resource == null) return [];
  const id = normalizeAbsolutePath(data.resource + (data.resourceQuery || ""));
  if (plugin.transformInclude && !plugin.transformInclude(id)) return [];
  const { filter } = normalizeObjectHook("load", plugin.transform);
  if (!filter(id)) return [];
  return [{
    loader: transformLoader,
    options: { plugin },
    ident: plugin.name
  }];
}
function normalizeAbsolutePath(path4) {
  if (isAbsolute(path4)) return normalize(path4);
  else return path4;
}

// ../../node_modules/.pnpm/unplugin@3.4.0_esbuild@0.27.7_rollup@4.63.4_vite@5.4.21_@types+node@20.19.43_terser@5.51.2_/node_modules/unplugin/dist/context-AOdkHe_5.mjs
import { resolve as resolve2 } from "path";
import { Buffer as Buffer2 } from "buffer";
function createBuildContext(compiler, compilation, loaderContext, inputSourceMap) {
  return {
    getNativeBuildContext() {
      return {
        framework: "rspack",
        compiler,
        compilation,
        loaderContext,
        inputSourceMap
      };
    },
    addWatchFile(file) {
      const cwd = process.cwd();
      const resolvedPath = resolve2(cwd, file);
      compilation.fileDependencies.add(resolvedPath);
      loaderContext?.addDependency(resolvedPath);
    },
    getWatchFiles() {
      return Array.from(compilation.fileDependencies);
    },
    parse,
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name;
      if (emittedFile.source && outFileName) {
        const { sources } = compilation.compiler.webpack;
        compilation.emitAsset(outFileName, new sources.RawSource(typeof emittedFile.source === "string" ? emittedFile.source : Buffer2.from(emittedFile.source)));
      }
    }
  };
}
function normalizeMessage(error) {
  const err = new Error(typeof error === "string" ? error : error.message);
  if (typeof error === "object") {
    err.stack = error.stack;
    err.cause = error.meta;
  }
  return err;
}

// ../../node_modules/.pnpm/unplugin@3.4.0_esbuild@0.27.7_rollup@4.63.4_vite@5.4.21_@types+node@20.19.43_terser@5.51.2_/node_modules/unplugin/dist/utils-CfJoYofY.mjs
import { basename, dirname, resolve as resolve3 } from "path";
import fs from "fs";
function encodeVirtualModuleId(id, plugin) {
  return resolve3(plugin.__virtualModulePrefix, encodeURIComponent(id));
}
function decodeVirtualModuleId(encoded, _plugin) {
  return decodeURIComponent(basename(encoded));
}
function isVirtualModuleId(encoded, plugin) {
  return dirname(encoded) === plugin.__virtualModulePrefix;
}
var FakeVirtualModulesPlugin = class FakeVirtualModulesPlugin2 {
  plugin;
  name = "FakeVirtualModulesPlugin";
  static counters = /* @__PURE__ */ new Map();
  static initCleanup = false;
  constructor(plugin) {
    this.plugin = plugin;
    if (!FakeVirtualModulesPlugin2.initCleanup) {
      FakeVirtualModulesPlugin2.initCleanup = true;
      process.once("exit", () => {
        FakeVirtualModulesPlugin2.counters.forEach((_, dir) => {
          fs.rmSync(dir, {
            recursive: true,
            force: true
          });
        });
      });
    }
  }
  apply(compiler) {
    const dir = this.plugin.__virtualModulePrefix;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const counter = FakeVirtualModulesPlugin2.counters.get(dir) ?? 0;
    FakeVirtualModulesPlugin2.counters.set(dir, counter + 1);
    compiler.hooks.shutdown.tap(this.name, () => {
      const counter2 = (FakeVirtualModulesPlugin2.counters.get(dir) ?? 1) - 1;
      if (counter2 === 0) {
        FakeVirtualModulesPlugin2.counters.delete(dir);
        fs.rmSync(dir, {
          recursive: true,
          force: true
        });
      } else FakeVirtualModulesPlugin2.counters.set(dir, counter2);
    });
  }
  async writeModule(file) {
    return fs.promises.writeFile(file, "");
  }
};

// ../../node_modules/.pnpm/unplugin@3.4.0_esbuild@0.27.7_rollup@4.63.4_vite@5.4.21_@types+node@20.19.43_terser@5.51.2_/node_modules/unplugin/dist/context-CjyN3JjT.mjs
import { createRequire } from "module";
import { resolve as resolve4 } from "path";
import { Buffer as Buffer3 } from "buffer";
import process2 from "process";
function contextOptionsFromCompilation(compilation) {
  return {
    addWatchFile(file) {
      (compilation.fileDependencies ?? compilation.compilationDependencies).add(file);
    },
    getWatchFiles() {
      return Array.from(compilation.fileDependencies ?? compilation.compilationDependencies);
    }
  };
}
var require2 = createRequire(import.meta.url);
function getSource(fileSource) {
  return new (require2("webpack")).sources.RawSource(typeof fileSource === "string" ? fileSource : Buffer3.from(fileSource.buffer));
}
function createBuildContext2(options, compiler, compilation, loaderContext, inputSourceMap) {
  return {
    parse,
    addWatchFile(id) {
      options.addWatchFile(resolve4(process2.cwd(), id));
    },
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name;
      if (emittedFile.source && outFileName) {
        if (!compilation) throw new Error("unplugin/webpack: emitFile outside supported hooks  (buildStart, buildEnd, load, transform, watchChange)");
        compilation.emitAsset(outFileName, getSource(emittedFile.source));
      }
    },
    getWatchFiles() {
      return options.getWatchFiles();
    },
    getNativeBuildContext() {
      return {
        framework: "webpack",
        compiler,
        compilation,
        loaderContext,
        inputSourceMap
      };
    }
  };
}
function normalizeMessage2(error) {
  const err = new Error(typeof error === "string" ? error : error.message);
  if (typeof error === "object") {
    err.stack = error.stack;
    err.cause = error.meta;
  }
  return err;
}

// ../../node_modules/.pnpm/unplugin@3.4.0_esbuild@0.27.7_rollup@4.63.4_vite@5.4.21_@types+node@20.19.43_terser@5.51.2_/node_modules/unplugin/dist/index.mjs
import { createRequire as createRequire2 } from "module";
import path, { extname, isAbsolute as isAbsolute2, resolve as resolve6 } from "path";
import fs2 from "fs";
import { Buffer as Buffer$1 } from "buffer";

// ../../node_modules/.pnpm/@jridgewell+sourcemap-codec@1.6.0/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c;
  charToInt[c] = i;
}
function decodeInteger(reader) {
  let value = 0;
  let shift = 0;
  let integer = 0;
  do {
    const c = reader.next();
    integer = charToInt[c];
    value |= (integer & 31) << shift;
    shift += 5;
  } while (integer & 32);
  return value;
}
function decodeSign(num) {
  return num & 1 ? -2147483648 | -(num >>> 1) : num >>> 1;
}
function encodeInteger(builder, num) {
  do {
    let clamped = num & 31;
    num >>>= 5;
    if (num > 0) clamped |= 32;
    builder.write(intToChar[clamped]);
  } while (num > 0);
}
function encodeSign(num) {
  return num < 0 ? -num << 1 | 1 : num << 1;
}
function hasMoreVlq(reader, max) {
  if (reader.pos >= max) return false;
  return reader.peek() !== comma;
}
var bufLength = 1024 * 16;
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
  decode(buf) {
    const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
    return out.toString();
  }
} : {
  decode(buf) {
    let out = "";
    for (let i = 0; i < buf.length; i++) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  }
};
var StringWriter = class {
  constructor() {
    this.pos = 0;
    this.out = "";
    this.buffer = new Uint8Array(bufLength);
  }
  write(v) {
    const { buffer } = this;
    buffer[this.pos++] = v;
    if (this.pos === bufLength) {
      this.out += td.decode(buffer);
      this.pos = 0;
    }
  }
  flush() {
    const { buffer, out, pos } = this;
    return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
  }
};
var StringReader = class {
  constructor(buffer) {
    this.pos = 0;
    this.buffer = buffer;
  }
  next() {
    return this.buffer.charCodeAt(this.pos++);
  }
  peek() {
    return this.buffer.charCodeAt(this.pos);
  }
  indexOf(char) {
    const { buffer, pos } = this;
    const idx = buffer.indexOf(char, pos);
    return idx === -1 ? buffer.length : idx;
  }
};
function decode(mappings) {
  const { length } = mappings;
  const reader = new StringReader(mappings);
  const decoded = [];
  let genColumn = 0;
  let sourcesIndex = 0;
  let sourceLine = 0;
  let sourceColumn = 0;
  let namesIndex = 0;
  do {
    const semi = reader.indexOf(";");
    const line = [];
    let sorted = true;
    let lastCol = 0;
    genColumn = 0;
    while (reader.pos < semi) {
      let seg;
      genColumn += decodeSign(decodeInteger(reader));
      if (genColumn < lastCol) sorted = false;
      lastCol = genColumn;
      if (hasMoreVlq(reader, semi)) {
        sourcesIndex += decodeSign(decodeInteger(reader));
        sourceLine += decodeSign(decodeInteger(reader));
        sourceColumn += decodeSign(decodeInteger(reader));
        if (hasMoreVlq(reader, semi)) {
          namesIndex += decodeSign(decodeInteger(reader));
          seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex];
        } else {
          seg = [genColumn, sourcesIndex, sourceLine, sourceColumn];
        }
      } else {
        seg = [genColumn];
      }
      line.push(seg);
      reader.pos++;
    }
    if (!sorted) sort(line);
    decoded.push(line);
    reader.pos = semi + 1;
  } while (reader.pos <= length);
  return decoded;
}
function sort(line) {
  line.sort(sortComparator);
}
function sortComparator(a, b) {
  return a[0] - b[0];
}
function encode(decoded) {
  const writer = new StringWriter();
  let sourcesIndex = 0;
  let sourceLine = 0;
  let sourceColumn = 0;
  let namesIndex = 0;
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    if (i > 0) writer.write(semicolon);
    if (line.length === 0) continue;
    let genColumn = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (j > 0) writer.write(comma);
      encodeInteger(writer, encodeSign(segment[0] - genColumn));
      genColumn = segment[0];
      if (segment.length === 1) continue;
      encodeInteger(writer, encodeSign(segment[1] - sourcesIndex));
      encodeInteger(writer, encodeSign(segment[2] - sourceLine));
      encodeInteger(writer, encodeSign(segment[3] - sourceColumn));
      sourcesIndex = segment[1];
      sourceLine = segment[2];
      sourceColumn = segment[3];
      if (segment.length === 4) continue;
      encodeInteger(writer, encodeSign(segment[4] - namesIndex));
      namesIndex = segment[4];
    }
  }
  return writer.flush();
}

// ../../node_modules/.pnpm/@jridgewell+resolve-uri@3.1.2/node_modules/@jridgewell/resolve-uri/dist/resolve-uri.mjs
var schemeRegex = /^[\w+.-]+:\/\//;
var urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
var fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
function isAbsoluteUrl(input) {
  return schemeRegex.test(input);
}
function isSchemeRelativeUrl(input) {
  return input.startsWith("//");
}
function isAbsolutePath(input) {
  return input.startsWith("/");
}
function isFileUrl(input) {
  return input.startsWith("file:");
}
function isRelative(input) {
  return /^[.?#]/.test(input);
}
function parseAbsoluteUrl(input) {
  const match = urlRegex.exec(input);
  return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
}
function parseFileUrl(input) {
  const match = fileRegex.exec(input);
  const path4 = match[2];
  return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path4) ? path4 : "/" + path4, match[3] || "", match[4] || "");
}
function makeUrl(scheme, user, host, port, path4, query, hash) {
  return {
    scheme,
    user,
    host,
    port,
    path: path4,
    query,
    hash,
    type: 7
  };
}
function parseUrl(input) {
  if (isSchemeRelativeUrl(input)) {
    const url2 = parseAbsoluteUrl("http:" + input);
    url2.scheme = "";
    url2.type = 6;
    return url2;
  }
  if (isAbsolutePath(input)) {
    const url2 = parseAbsoluteUrl("http://foo.com" + input);
    url2.scheme = "";
    url2.host = "";
    url2.type = 5;
    return url2;
  }
  if (isFileUrl(input))
    return parseFileUrl(input);
  if (isAbsoluteUrl(input))
    return parseAbsoluteUrl(input);
  const url = parseAbsoluteUrl("http://foo.com/" + input);
  url.scheme = "";
  url.host = "";
  url.type = input ? input.startsWith("?") ? 3 : input.startsWith("#") ? 2 : 4 : 1;
  return url;
}
function stripPathFilename(path4) {
  if (path4.endsWith("/.."))
    return path4;
  const index = path4.lastIndexOf("/");
  return path4.slice(0, index + 1);
}
function mergePaths(url, base) {
  normalizePath(base, base.type);
  if (url.path === "/") {
    url.path = base.path;
  } else {
    url.path = stripPathFilename(base.path) + url.path;
  }
}
function normalizePath(url, type) {
  const rel = type <= 4;
  const pieces = url.path.split("/");
  let pointer = 1;
  let positive = 0;
  let addTrailingSlash = false;
  for (let i = 1; i < pieces.length; i++) {
    const piece = pieces[i];
    if (!piece) {
      addTrailingSlash = true;
      continue;
    }
    addTrailingSlash = false;
    if (piece === ".")
      continue;
    if (piece === "..") {
      if (positive) {
        addTrailingSlash = true;
        positive--;
        pointer--;
      } else if (rel) {
        pieces[pointer++] = piece;
      }
      continue;
    }
    pieces[pointer++] = piece;
    positive++;
  }
  let path4 = "";
  for (let i = 1; i < pointer; i++) {
    path4 += "/" + pieces[i];
  }
  if (!path4 || addTrailingSlash && !path4.endsWith("/..")) {
    path4 += "/";
  }
  url.path = path4;
}
function resolve5(input, base) {
  if (!input && !base)
    return "";
  const url = parseUrl(input);
  let inputType = url.type;
  if (base && inputType !== 7) {
    const baseUrl = parseUrl(base);
    const baseType = baseUrl.type;
    switch (inputType) {
      case 1:
        url.hash = baseUrl.hash;
      // fall through
      case 2:
        url.query = baseUrl.query;
      // fall through
      case 3:
      case 4:
        mergePaths(url, baseUrl);
      // fall through
      case 5:
        url.user = baseUrl.user;
        url.host = baseUrl.host;
        url.port = baseUrl.port;
      // fall through
      case 6:
        url.scheme = baseUrl.scheme;
    }
    if (baseType > inputType)
      inputType = baseType;
  }
  normalizePath(url, inputType);
  const queryHash = url.query + url.hash;
  switch (inputType) {
    // This is impossible, because of the empty checks at the start of the function.
    // case UrlType.Empty:
    case 2:
    case 3:
      return queryHash;
    case 4: {
      const path4 = url.path.slice(1);
      if (!path4)
        return queryHash || ".";
      if (isRelative(base || input) && !isRelative(path4)) {
        return "./" + path4 + queryHash;
      }
      return path4 + queryHash;
    }
    case 5:
      return url.path + queryHash;
    default:
      return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
  }
}

// ../../node_modules/.pnpm/@jridgewell+trace-mapping@0.3.31/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.mjs
function stripFilename(path4) {
  if (!path4) return "";
  const index = path4.lastIndexOf("/");
  return path4.slice(0, index + 1);
}
function resolver(mapUrl, sourceRoot) {
  const from = stripFilename(mapUrl);
  const prefix = sourceRoot ? sourceRoot + "/" : "";
  return (source) => resolve5(prefix + (source || ""), from);
}
var COLUMN = 0;
function maybeSort(mappings, owned) {
  const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
  if (unsortedIndex === mappings.length) return mappings;
  if (!owned) mappings = mappings.slice();
  for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
    mappings[i] = sortSegments(mappings[i], owned);
  }
  return mappings;
}
function nextUnsortedSegmentLine(mappings, start) {
  for (let i = start; i < mappings.length; i++) {
    if (!isSorted(mappings[i])) return i;
  }
  return mappings.length;
}
function isSorted(line) {
  for (let j = 1; j < line.length; j++) {
    if (line[j][COLUMN] < line[j - 1][COLUMN]) {
      return false;
    }
  }
  return true;
}
function sortSegments(line, owned) {
  if (!owned) line = line.slice();
  return line.sort(sortComparator2);
}
function sortComparator2(a, b) {
  return a[COLUMN] - b[COLUMN];
}
var found = false;
function binarySearch(haystack, needle, low, high) {
  while (low <= high) {
    const mid = low + (high - low >> 1);
    const cmp = haystack[mid][COLUMN] - needle;
    if (cmp === 0) {
      found = true;
      return mid;
    }
    if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  found = false;
  return low - 1;
}
function upperBound(haystack, needle, index) {
  for (let i = index + 1; i < haystack.length; index = i++) {
    if (haystack[i][COLUMN] !== needle) break;
  }
  return index;
}
function lowerBound(haystack, needle, index) {
  for (let i = index - 1; i >= 0; index = i--) {
    if (haystack[i][COLUMN] !== needle) break;
  }
  return index;
}
function memoizedState() {
  return {
    lastKey: -1,
    lastNeedle: -1,
    lastIndex: -1
  };
}
function memoizedBinarySearch(haystack, needle, state, key) {
  const { lastKey, lastNeedle, lastIndex } = state;
  let low = 0;
  let high = haystack.length - 1;
  if (key === lastKey) {
    if (needle === lastNeedle) {
      found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
      return lastIndex;
    }
    if (needle >= lastNeedle) {
      low = lastIndex === -1 ? 0 : lastIndex;
    } else {
      high = lastIndex;
    }
  }
  state.lastKey = key;
  state.lastNeedle = needle;
  return state.lastIndex = binarySearch(haystack, needle, low, high);
}
function parse2(map) {
  return typeof map === "string" ? JSON.parse(map) : map;
}
var LEAST_UPPER_BOUND = -1;
var GREATEST_LOWER_BOUND = 1;
var TraceMap = class {
  constructor(map, mapUrl) {
    const isString2 = typeof map === "string";
    if (!isString2 && map._decodedMemo) return map;
    const parsed = parse2(map);
    const { version, file, names, sourceRoot, sources, sourcesContent } = parsed;
    this.version = version;
    this.file = file;
    this.names = names || [];
    this.sourceRoot = sourceRoot;
    this.sources = sources;
    this.sourcesContent = sourcesContent;
    this.ignoreList = parsed.ignoreList || parsed.x_google_ignoreList || void 0;
    const resolve7 = resolver(mapUrl, sourceRoot);
    this.resolvedSources = sources.map(resolve7);
    const { mappings } = parsed;
    if (typeof mappings === "string") {
      this._encoded = mappings;
      this._decoded = void 0;
    } else if (Array.isArray(mappings)) {
      this._encoded = void 0;
      this._decoded = maybeSort(mappings, isString2);
    } else if (parsed.sections) {
      throw new Error(`TraceMap passed sectioned source map, please use FlattenMap export instead`);
    } else {
      throw new Error(`invalid source map: ${JSON.stringify(parsed)}`);
    }
    this._decodedMemo = memoizedState();
    this._bySources = void 0;
    this._bySourceMemos = void 0;
  }
};
function cast(map) {
  return map;
}
function decodedMappings(map) {
  var _a;
  return (_a = cast(map))._decoded || (_a._decoded = decode(cast(map)._encoded));
}
function traceSegment(map, line, column) {
  const decoded = decodedMappings(map);
  if (line >= decoded.length) return null;
  const segments = decoded[line];
  const index = traceSegmentInternal(
    segments,
    cast(map)._decodedMemo,
    line,
    column,
    GREATEST_LOWER_BOUND
  );
  return index === -1 ? null : segments[index];
}
function traceSegmentInternal(segments, memo, line, column, bias) {
  let index = memoizedBinarySearch(segments, column, memo, line);
  if (found) {
    index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
  } else if (bias === LEAST_UPPER_BOUND) index++;
  if (index === -1 || index === segments.length) return -1;
  return index;
}

// ../../node_modules/.pnpm/@jridgewell+gen-mapping@0.3.13/node_modules/@jridgewell/gen-mapping/dist/gen-mapping.mjs
var SetArray = class {
  constructor() {
    this._indexes = { __proto__: null };
    this.array = [];
  }
};
function cast2(set) {
  return set;
}
function get(setarr, key) {
  return cast2(setarr)._indexes[key];
}
function put(setarr, key) {
  const index = get(setarr, key);
  if (index !== void 0) return index;
  const { array, _indexes: indexes } = cast2(setarr);
  const length = array.push(key);
  return indexes[key] = length - 1;
}
function remove(setarr, key) {
  const index = get(setarr, key);
  if (index === void 0) return;
  const { array, _indexes: indexes } = cast2(setarr);
  for (let i = index + 1; i < array.length; i++) {
    const k = array[i];
    array[i - 1] = k;
    indexes[k]--;
  }
  indexes[key] = void 0;
  array.pop();
}
var COLUMN2 = 0;
var SOURCES_INDEX = 1;
var SOURCE_LINE = 2;
var SOURCE_COLUMN = 3;
var NAMES_INDEX = 4;
var NO_NAME = -1;
var GenMapping = class {
  constructor({ file, sourceRoot } = {}) {
    this._names = new SetArray();
    this._sources = new SetArray();
    this._sourcesContent = [];
    this._mappings = [];
    this.file = file;
    this.sourceRoot = sourceRoot;
    this._ignoreList = new SetArray();
  }
};
function cast22(map) {
  return map;
}
var maybeAddSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
  return addSegmentInternal(
    true,
    map,
    genLine,
    genColumn,
    source,
    sourceLine,
    sourceColumn,
    name,
    content
  );
};
function setSourceContent(map, source, content) {
  const {
    _sources: sources,
    _sourcesContent: sourcesContent
    // _originalScopes: originalScopes,
  } = cast22(map);
  const index = put(sources, source);
  sourcesContent[index] = content;
}
function setIgnore(map, source, ignore = true) {
  const {
    _sources: sources,
    _sourcesContent: sourcesContent,
    _ignoreList: ignoreList
    // _originalScopes: originalScopes,
  } = cast22(map);
  const index = put(sources, source);
  if (index === sourcesContent.length) sourcesContent[index] = null;
  if (ignore) put(ignoreList, index);
  else remove(ignoreList, index);
}
function toDecodedMap(map) {
  const {
    _mappings: mappings,
    _sources: sources,
    _sourcesContent: sourcesContent,
    _names: names,
    _ignoreList: ignoreList
    // _originalScopes: originalScopes,
    // _generatedRanges: generatedRanges,
  } = cast22(map);
  removeEmptyFinalLines(mappings);
  return {
    version: 3,
    file: map.file || void 0,
    names: names.array,
    sourceRoot: map.sourceRoot || void 0,
    sources: sources.array,
    sourcesContent,
    mappings,
    // originalScopes,
    // generatedRanges,
    ignoreList: ignoreList.array
  };
}
function toEncodedMap(map) {
  const decoded = toDecodedMap(map);
  return Object.assign({}, decoded, {
    // originalScopes: decoded.originalScopes.map((os) => encodeOriginalScopes(os)),
    // generatedRanges: encodeGeneratedRanges(decoded.generatedRanges as GeneratedRange[]),
    mappings: encode(decoded.mappings)
  });
}
function addSegmentInternal(skipable, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) {
  const {
    _mappings: mappings,
    _sources: sources,
    _sourcesContent: sourcesContent,
    _names: names
    // _originalScopes: originalScopes,
  } = cast22(map);
  const line = getIndex(mappings, genLine);
  const index = getColumnIndex(line, genColumn);
  if (!source) {
    if (skipable && skipSourceless(line, index)) return;
    return insert(line, index, [genColumn]);
  }
  assert(sourceLine);
  assert(sourceColumn);
  const sourcesIndex = put(sources, source);
  const namesIndex = name ? put(names, name) : NO_NAME;
  if (sourcesIndex === sourcesContent.length) sourcesContent[sourcesIndex] = content != null ? content : null;
  if (skipable && skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex)) {
    return;
  }
  return insert(
    line,
    index,
    name ? [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex] : [genColumn, sourcesIndex, sourceLine, sourceColumn]
  );
}
function assert(_val) {
}
function getIndex(arr, index) {
  for (let i = arr.length; i <= index; i++) {
    arr[i] = [];
  }
  return arr[index];
}
function getColumnIndex(line, genColumn) {
  let index = line.length;
  for (let i = index - 1; i >= 0; index = i--) {
    const current = line[i];
    if (genColumn >= current[COLUMN2]) break;
  }
  return index;
}
function insert(array, index, value) {
  for (let i = array.length; i > index; i--) {
    array[i] = array[i - 1];
  }
  array[index] = value;
}
function removeEmptyFinalLines(mappings) {
  const { length } = mappings;
  let len = length;
  for (let i = len - 1; i >= 0; len = i, i--) {
    if (mappings[i].length > 0) break;
  }
  if (len < length) mappings.length = len;
}
function skipSourceless(line, index) {
  if (index === 0) return true;
  const prev = line[index - 1];
  return prev.length === 1;
}
function skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex) {
  if (index === 0) return false;
  const prev = line[index - 1];
  if (prev.length === 1) return false;
  return sourcesIndex === prev[SOURCES_INDEX] && sourceLine === prev[SOURCE_LINE] && sourceColumn === prev[SOURCE_COLUMN] && namesIndex === (prev.length === 5 ? prev[NAMES_INDEX] : NO_NAME);
}

// ../../node_modules/.pnpm/@jridgewell+remapping@2.3.5/node_modules/@jridgewell/remapping/dist/remapping.mjs
var SOURCELESS_MAPPING = /* @__PURE__ */ SegmentObject("", -1, -1, "", null, false);
var EMPTY_SOURCES = [];
function SegmentObject(source, line, column, name, content, ignore) {
  return { source, line, column, name, content, ignore };
}
function Source(map, sources, source, content, ignore) {
  return {
    map,
    sources,
    source,
    content,
    ignore
  };
}
function MapSource(map, sources) {
  return Source(map, sources, "", null, false);
}
function OriginalSource(source, content, ignore) {
  return Source(null, EMPTY_SOURCES, source, content, ignore);
}
function traceMappings(tree) {
  const gen = new GenMapping({ file: tree.map.file });
  const { sources: rootSources, map } = tree;
  const rootNames = map.names;
  const rootMappings = decodedMappings(map);
  for (let i = 0; i < rootMappings.length; i++) {
    const segments = rootMappings[i];
    for (let j = 0; j < segments.length; j++) {
      const segment = segments[j];
      const genCol = segment[0];
      let traced = SOURCELESS_MAPPING;
      if (segment.length !== 1) {
        const source2 = rootSources[segment[1]];
        traced = originalPositionFor(
          source2,
          segment[2],
          segment[3],
          segment.length === 5 ? rootNames[segment[4]] : ""
        );
        if (traced == null) continue;
      }
      const { column, line, name, content, source, ignore } = traced;
      maybeAddSegment(gen, i, genCol, source, line, column, name);
      if (source && content != null) setSourceContent(gen, source, content);
      if (ignore) setIgnore(gen, source, true);
    }
  }
  return gen;
}
function originalPositionFor(source, line, column, name) {
  if (!source.map) {
    return SegmentObject(source.source, line, column, name, source.content, source.ignore);
  }
  const segment = traceSegment(source.map, line, column);
  if (segment == null) return null;
  if (segment.length === 1) return SOURCELESS_MAPPING;
  return originalPositionFor(
    source.sources[segment[1]],
    segment[2],
    segment[3],
    segment.length === 5 ? source.map.names[segment[4]] : name
  );
}
function asArray(value) {
  if (Array.isArray(value)) return value;
  return [value];
}
function buildSourceMapTree(input, loader) {
  const maps = asArray(input).map((m) => new TraceMap(m, ""));
  const map = maps.pop();
  for (let i = 0; i < maps.length; i++) {
    if (maps[i].sources.length > 1) {
      throw new Error(
        `Transformation map ${i} must have exactly one source file.
Did you specify these with the most recent transformation maps first?`
      );
    }
  }
  let tree = build(map, loader, "", 0);
  for (let i = maps.length - 1; i >= 0; i--) {
    tree = MapSource(maps[i], [tree]);
  }
  return tree;
}
function build(map, loader, importer, importerDepth) {
  const { resolvedSources, sourcesContent, ignoreList } = map;
  const depth = importerDepth + 1;
  const children = resolvedSources.map((sourceFile, i) => {
    const ctx = {
      importer,
      depth,
      source: sourceFile || "",
      content: void 0,
      ignore: void 0
    };
    const sourceMap = loader(ctx.source, ctx);
    const { source, content, ignore } = ctx;
    if (sourceMap) return build(new TraceMap(sourceMap, source), loader, source, depth);
    const sourceContent = content !== void 0 ? content : sourcesContent ? sourcesContent[i] : null;
    const ignored = ignore !== void 0 ? ignore : ignoreList ? ignoreList.includes(i) : false;
    return OriginalSource(source, sourceContent, ignored);
  });
  return MapSource(map, children);
}
var SourceMap = class {
  constructor(map, options) {
    const out = options.decodedMappings ? toDecodedMap(map) : toEncodedMap(map);
    this.version = out.version;
    this.file = out.file;
    this.mappings = out.mappings;
    this.names = out.names;
    this.ignoreList = out.ignoreList;
    this.sourceRoot = out.sourceRoot;
    this.sources = out.sources;
    if (!options.excludeContent) {
      this.sourcesContent = out.sourcesContent;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
};
function remapping(input, loader, options) {
  const opts = typeof options === "object" ? options : { excludeContent: !!options, decodedMappings: false };
  const tree = buildSourceMapTree(input, loader);
  return new SourceMap(traceMappings(tree), opts);
}

// ../../node_modules/.pnpm/unplugin@3.4.0_esbuild@0.27.7_rollup@4.63.4_vite@5.4.21_@types+node@20.19.43_terser@5.51.2_/node_modules/unplugin/dist/index.mjs
import * as querystring from "querystring";
import process$1 from "process";
var __require = /* @__PURE__ */ (() => createRequire2(import.meta.url))();
var version$1 = "3.4.0";
var ExtToLoader$1 = {
  ".js": "js",
  ".mjs": "js",
  ".cjs": "js",
  ".jsx": "jsx",
  ".ts": "ts",
  ".cts": "ts",
  ".mts": "ts",
  ".tsx": "tsx",
  ".css": "css",
  ".less": "css",
  ".stylus": "css",
  ".scss": "css",
  ".sass": "css",
  ".json": "json",
  ".txt": "text"
};
function guessLoader$1(id) {
  return ExtToLoader$1[path.extname(id).toLowerCase()] || "js";
}
function unwrapLoader$1(loader, code, id) {
  if (typeof loader === "function") return loader(code, id);
  return loader;
}
function createBuildContext$1(build2) {
  const watchFiles = [];
  return {
    addWatchFile(file) {
      watchFiles.push(file);
    },
    getWatchFiles() {
      return watchFiles;
    },
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name;
      const outdir = build2?.config?.outdir;
      if (outdir && emittedFile.source && outFileName) {
        const outPath = path.resolve(outdir, outFileName);
        const outDir = path.dirname(outPath);
        if (!fs2.existsSync(outDir)) fs2.mkdirSync(outDir, { recursive: true });
        fs2.writeFileSync(outPath, emittedFile.source);
      }
    },
    parse,
    getNativeBuildContext() {
      return {
        framework: "bun",
        build: build2
      };
    }
  };
}
function createPluginContext$1(buildContext) {
  const errors = [];
  const warnings = [];
  return {
    errors,
    warnings,
    mixedContext: {
      ...buildContext,
      error(error) {
        errors.push(error);
      },
      warn(warning) {
        warnings.push(warning);
      }
    }
  };
}
function toBunNamespace(name) {
  return name.replace(/[^\w$-]/g, "-");
}
function getBunPlugin(factory) {
  return (userOptions) => {
    if (typeof Bun === "undefined") throw new ReferenceError("Bun is not supported in this environment");
    if (!Bun.semver.satisfies(Bun.version, ">=1.2.22")) throw new Error("Bun 1.2.22 or higher is required, please upgrade Bun");
    const meta = {
      framework: "bun",
      versions: {
        bun: Bun.version,
        unplugin: version$1
      }
    };
    const plugins = toArray(factory(userOptions, meta));
    return {
      name: (plugins.length === 1 ? plugins[0].name : meta.bunHostName) ?? `unplugin-host:${plugins.map((p) => p.name).join(":")}`,
      async setup(build2) {
        const context = createBuildContext$1(build2);
        for (const plugin of plugins) await plugin.bun?.setup?.(build2);
        if (plugins.some((plugin) => plugin.buildStart)) build2.onStart(async () => {
          for (const plugin of plugins) if (plugin.buildStart) await plugin.buildStart.call(context);
        });
        const resolveIdHooks = plugins.filter((plugin) => plugin.resolveId).map((plugin) => ({
          plugin,
          ...normalizeObjectHook("resolveId", plugin.resolveId)
        }));
        const loadHooks = plugins.filter((plugin) => plugin.load).map((plugin) => ({
          plugin,
          ...normalizeObjectHook("load", plugin.load)
        }));
        const transformHooks = plugins.filter((plugin) => plugin.transform || plugin.transformInclude).map((plugin) => ({
          plugin,
          ...normalizeObjectHook("transform", plugin.transform)
        }));
        const virtualModulePlugins = /* @__PURE__ */ new Set();
        for (const plugin of plugins) if (plugin.resolveId && plugin.load) virtualModulePlugins.add(plugin.name);
        if (resolveIdHooks.length) build2.onResolve({ filter: /.*/ }, async (args) => {
          if (build2.config?.external?.includes(args.path)) return;
          for (const { plugin, handler, filter } of resolveIdHooks) {
            if (!filter(args.path)) continue;
            const { mixedContext, errors, warnings } = createPluginContext$1(context);
            const isEntry = args.kind === "entry-point-run" || args.kind === "entry-point-build";
            const result = await handler.call(mixedContext, args.path, isEntry ? void 0 : args.importer, { isEntry });
            for (const warning of warnings) console.warn("[unplugin]", typeof warning === "string" ? warning : warning.message);
            if (errors.length > 0) {
              const errorMessage = errors.map((e) => typeof e === "string" ? e : e.message).join("\n");
              throw new Error(`[unplugin] ${plugin.name}: ${errorMessage}`);
            }
            if (typeof result === "string") {
              if (!isAbsolute2(result)) return {
                path: result,
                namespace: toBunNamespace(plugin.name)
              };
              return { path: result };
            } else if (typeof result === "object" && result !== null) {
              if (!isAbsolute2(result.id)) return {
                path: result.id,
                external: result.external,
                namespace: toBunNamespace(plugin.name)
              };
              return {
                path: result.id,
                external: result.external
              };
            }
          }
        });
        async function processLoadTransform(id, namespace, loader) {
          let code;
          let hasResult = false;
          let activePlugin;
          const namespaceLoadHooks = namespace === "file" ? loadHooks : loadHooks.filter((h) => h.plugin.name === namespace);
          for (const { plugin, handler, filter } of namespaceLoadHooks) {
            if (plugin.loadInclude && !plugin.loadInclude(id)) continue;
            if (!filter(id)) continue;
            const { mixedContext, errors, warnings } = createPluginContext$1(context);
            const result = await handler.call(mixedContext, id);
            for (const warning of warnings) console.warn("[unplugin]", typeof warning === "string" ? warning : warning.message);
            if (errors.length > 0) {
              const errorMessage = errors.map((e) => typeof e === "string" ? e : e.message).join("\n");
              throw new Error(`[unplugin] ${plugin.name}: ${errorMessage}`);
            }
            if (typeof result === "string") {
              code = result;
              hasResult = true;
              activePlugin = plugin;
              break;
            } else if (typeof result === "object" && result !== null) {
              code = result.code;
              hasResult = true;
              activePlugin = plugin;
              break;
            }
          }
          if (!hasResult && namespace === "file" && transformHooks.length > 0) code = await Bun.file(id).text();
          if (code !== void 0) {
            const namespaceTransformHooks = namespace === "file" ? transformHooks : transformHooks.filter((h) => h.plugin.name === namespace);
            for (const { plugin, handler, filter } of namespaceTransformHooks) {
              if (plugin.transformInclude && !plugin.transformInclude(id)) continue;
              if (!filter(id, code)) continue;
              const { mixedContext, errors, warnings } = createPluginContext$1(context);
              const result = await handler.call(mixedContext, code, id);
              for (const warning of warnings) console.warn("[unplugin]", typeof warning === "string" ? warning : warning.message);
              if (errors.length > 0) {
                const errorMessage = errors.map((e) => typeof e === "string" ? e : e.message).join("\n");
                throw new Error(`[unplugin] ${plugin.name}: ${errorMessage}`);
              }
              if (typeof result === "string") {
                code = result;
                hasResult = true;
              } else if (typeof result === "object" && result !== null) {
                code = result.code;
                hasResult = true;
              }
            }
          }
          if (hasResult && code !== void 0) {
            const pluginLoader = activePlugin?.bun?.loader;
            return {
              contents: code,
              loader: (pluginLoader && unwrapLoader$1(pluginLoader, code, id)) ?? loader ?? guessLoader$1(id)
            };
          }
        }
        if (loadHooks.length || transformHooks.length) build2.onLoad({
          filter: /.*/,
          namespace: "file"
        }, async (args) => {
          return processLoadTransform(args.path, "file", args.loader);
        });
        for (const pluginName of virtualModulePlugins) build2.onLoad({
          filter: /.*/,
          namespace: toBunNamespace(pluginName)
        }, async (args) => {
          return processLoadTransform(args.path, pluginName, args.loader);
        });
        if (plugins.some((plugin) => plugin.buildEnd || plugin.writeBundle)) build2.onEnd(async () => {
          for (const plugin of plugins) {
            if (plugin.buildEnd) await plugin.buildEnd.call(context);
            if (plugin.writeBundle) await plugin.writeBundle();
          }
        });
      }
    };
  };
}
var ExtToLoader = {
  ".js": "js",
  ".mjs": "js",
  ".cjs": "js",
  ".jsx": "jsx",
  ".ts": "ts",
  ".cts": "ts",
  ".mts": "ts",
  ".tsx": "tsx",
  ".css": "css",
  ".less": "css",
  ".stylus": "css",
  ".scss": "css",
  ".sass": "css",
  ".json": "json",
  ".txt": "text"
};
function guessLoader(code, id) {
  return ExtToLoader[path.extname(id).toLowerCase()] || "js";
}
function unwrapLoader(loader, code, id) {
  if (typeof loader === "function") return loader(code, id);
  return loader;
}
function fixSourceMap(map) {
  if (!Object.hasOwn(map, "toString")) Object.defineProperty(map, "toString", {
    enumerable: false,
    value: function toString() {
      return JSON.stringify(this);
    }
  });
  if (!Object.hasOwn(map, "toUrl")) Object.defineProperty(map, "toUrl", {
    enumerable: false,
    value: function toUrl() {
      return `data:application/json;charset=utf-8;base64,${Buffer$1.from(this.toString()).toString("base64")}`;
    }
  });
  return map;
}
var nullSourceMap = {
  names: [],
  sources: [],
  mappings: "",
  version: 3
};
function combineSourcemaps(filename, sourcemapList) {
  sourcemapList = sourcemapList.filter((m) => m.sources);
  if (sourcemapList.length === 0 || sourcemapList.every((m) => m.sources.length === 0)) return { ...nullSourceMap };
  let map;
  let mapIndex = 1;
  if (!sourcemapList.slice(0, -1).some((m) => m.sources.length !== 1)) map = remapping(sourcemapList, () => null, true);
  else map = remapping(sourcemapList[0], (sourcefile) => {
    if (sourcefile === filename && sourcemapList[mapIndex]) return sourcemapList[mapIndex++];
    else return { ...nullSourceMap };
  }, true);
  if (!map.file) delete map.file;
  return map;
}
function createBuildContext3(build2) {
  const watchFiles = [];
  const { initialOptions } = build2;
  return {
    parse,
    addWatchFile() {
      throw new Error("unplugin/esbuild: addWatchFile outside supported hooks (resolveId, load, transform)");
    },
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name;
      if (initialOptions.outdir && emittedFile.source && outFileName) {
        const outPath = path.resolve(initialOptions.outdir, outFileName);
        const outDir = path.dirname(outPath);
        if (!fs2.existsSync(outDir)) fs2.mkdirSync(outDir, { recursive: true });
        fs2.writeFileSync(outPath, emittedFile.source);
      }
    },
    getWatchFiles() {
      return watchFiles;
    },
    getNativeBuildContext() {
      return {
        framework: "esbuild",
        build: build2
      };
    }
  };
}
function createPluginContext(context) {
  const errors = [];
  const warnings = [];
  const pluginContext = {
    error(message) {
      errors.push(normalizeMessage3(message));
    },
    warn(message) {
      warnings.push(normalizeMessage3(message));
    }
  };
  return {
    errors,
    warnings,
    mixedContext: {
      ...context,
      ...pluginContext,
      addWatchFile(id) {
        context.getWatchFiles().push(id);
      }
    }
  };
}
function normalizeMessage3(message) {
  if (typeof message === "string") message = { message };
  return {
    id: message.id,
    pluginName: message.plugin,
    text: message.message,
    location: message.loc ? {
      file: message.loc.file,
      line: message.loc.line,
      column: message.loc.column
    } : null,
    detail: message.meta,
    notes: []
  };
}
function processCodeWithSourceMap(map, code) {
  if (map) {
    if (!map.sourcesContent || map.sourcesContent.length === 0) map.sourcesContent = [code];
    map = fixSourceMap(map);
    code += `
//# sourceMappingURL=${map.toUrl()}`;
  }
  return code;
}
function getEsbuildPlugin(factory) {
  return (userOptions) => {
    const meta = {
      framework: "esbuild",
      versions: { unplugin: version$1 }
    };
    const plugins = toArray(factory(userOptions, meta));
    const setupPlugins = async (build2) => {
      const setup = buildSetup();
      const loaders = [];
      for (const plugin of plugins) {
        const loader = {};
        await setup(plugin)({
          ...build2,
          onLoad(_options, callback) {
            loader.options = _options;
            loader.onLoadCb = callback;
          },
          onTransform(_options, callback) {
            loader.options ||= _options;
            loader.onTransformCb = callback;
          }
        }, build2);
        if (loader.onLoadCb || loader.onTransformCb) loaders.push(loader);
      }
      if (loaders.length) build2.onLoad(loaders.length === 1 ? loaders[0].options : { filter: /.*/ }, async (args) => {
        function checkFilter(options) {
          return loaders.length === 1 || !options?.filter || options.filter.test(args.path);
        }
        let result;
        for (const { options, onLoadCb } of loaders) {
          if (!checkFilter(options)) continue;
          if (onLoadCb) result = await onLoadCb(args);
          if (result?.contents) break;
        }
        let fsContentsCache;
        for (const { options, onTransformCb } of loaders) {
          if (!checkFilter(options)) continue;
          if (onTransformCb) {
            const _result = await onTransformCb({
              ...result,
              ...args,
              async getContents() {
                if (result?.contents) return result.contents;
                if (fsContentsCache) return fsContentsCache;
                return fsContentsCache = await fs2.promises.readFile(args.path, "utf8");
              }
            });
            if (_result?.contents) result = _result;
          }
        }
        if (result?.contents) return result;
      });
    };
    return {
      name: (plugins.length === 1 ? plugins[0].name : meta.esbuildHostName) ?? `unplugin-host:${plugins.map((p) => p.name).join(":")}`,
      setup: setupPlugins
    };
  };
}
function buildSetup() {
  return (plugin) => {
    return (build2, rawBuild) => {
      const context = createBuildContext3(rawBuild);
      const { onStart, onEnd, onResolve, onLoad, onTransform, initialOptions } = build2;
      const onResolveFilter = plugin.esbuild?.onResolveFilter ?? /.*/;
      const onLoadFilter = plugin.esbuild?.onLoadFilter ?? /.*/;
      const loader = plugin.esbuild?.loader ?? guessLoader;
      plugin.esbuild?.config?.call(context, initialOptions);
      if (plugin.buildStart) onStart(() => plugin.buildStart.call(context));
      if (plugin.buildEnd || plugin.writeBundle) onEnd(async () => {
        if (plugin.buildEnd) await plugin.buildEnd.call(context);
        if (plugin.writeBundle) await plugin.writeBundle();
      });
      if (plugin.resolveId) onResolve({ filter: onResolveFilter }, async (args) => {
        const id = args.path;
        if (initialOptions.external?.includes(id)) return;
        const { handler, filter } = normalizeObjectHook("resolveId", plugin.resolveId);
        if (!filter(id)) return;
        const { errors, warnings, mixedContext } = createPluginContext(context);
        const isEntry = args.kind === "entry-point";
        const result = await handler.call(mixedContext, id, isEntry ? void 0 : args.importer, { isEntry });
        if (typeof result === "string") return {
          path: result,
          namespace: plugin.name,
          errors,
          warnings,
          watchFiles: mixedContext.getWatchFiles()
        };
        else if (typeof result === "object" && result !== null) return {
          path: result.id,
          external: result.external,
          namespace: plugin.name,
          errors,
          warnings,
          watchFiles: mixedContext.getWatchFiles()
        };
      });
      if (plugin.load) onLoad({ filter: onLoadFilter }, async (args) => {
        const { handler, filter } = normalizeObjectHook("load", plugin.load);
        const id = args.path + (args.suffix || "");
        if (plugin.loadInclude && !plugin.loadInclude(id)) return;
        if (!filter(id)) return;
        const { errors, warnings, mixedContext } = createPluginContext(context);
        let code;
        let map;
        const result = await handler.call(mixedContext, id);
        if (typeof result === "string") code = result;
        else if (typeof result === "object" && result !== null) {
          code = result.code;
          map = result.map;
        }
        if (code === void 0) return null;
        if (map) code = processCodeWithSourceMap(map, code);
        const resolveDir = path.dirname(args.path);
        return {
          contents: code,
          errors,
          warnings,
          watchFiles: mixedContext.getWatchFiles(),
          loader: unwrapLoader(loader, code, args.path),
          resolveDir
        };
      });
      if (plugin.transform) onTransform({ filter: onLoadFilter }, async (args) => {
        const { handler, filter } = normalizeObjectHook("transform", plugin.transform);
        const id = args.path + (args.suffix || "");
        if (plugin.transformInclude && !plugin.transformInclude(id)) return;
        let code = await args.getContents();
        if (!filter(id, code)) return;
        const { mixedContext, errors, warnings } = createPluginContext(context);
        const resolveDir = path.dirname(args.path);
        let map;
        const result = await handler.call(mixedContext, code, id);
        if (typeof result === "string") code = result;
        else if (typeof result === "object" && result !== null) {
          code = result.code;
          if (map && result.map) map = combineSourcemaps(args.path, [result.map === "string" ? JSON.parse(result.map) : result.map, map]);
          else if (typeof result.map === "string") map = JSON.parse(result.map);
          else map = result.map;
        }
        if (code) {
          if (map) code = processCodeWithSourceMap(map, code);
          return {
            contents: code,
            errors,
            warnings,
            watchFiles: mixedContext.getWatchFiles(),
            loader: unwrapLoader(loader, code, args.path),
            resolveDir
          };
        }
      });
      if (plugin.esbuild?.setup) return plugin.esbuild.setup(rawBuild);
    };
  };
}
function createFarmContext(context, currentResolveId) {
  return {
    parse,
    addWatchFile(id) {
      context.addWatchFile(id, currentResolveId || id);
    },
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name;
      if (emittedFile.source && outFileName) context.emitFile({
        resolvedPath: outFileName,
        name: outFileName,
        content: [...Buffer$1.from(emittedFile.source)],
        resourceType: extname(outFileName)
      });
    },
    getWatchFiles() {
      return context.getWatchFiles();
    },
    getNativeBuildContext() {
      return {
        framework: "farm",
        context
      };
    }
  };
}
function unpluginContext(context) {
  return {
    error: (error) => context.error(typeof error === "string" ? new Error(error) : error),
    warn: (error) => context.warn(typeof error === "string" ? new Error(error) : error)
  };
}
function convertEnforceToPriority(value) {
  const defaultPriority = 100;
  const enforceToPriority = {
    pre: 102,
    post: 98
  };
  return enforceToPriority[value] !== void 0 ? enforceToPriority[value] : defaultPriority;
}
function convertWatchEventChange(value) {
  return {
    Added: "create",
    Updated: "update",
    Removed: "delete"
  }[value];
}
function isString(variable) {
  return typeof variable === "string";
}
function isObject(variable) {
  return typeof variable === "object" && variable !== null;
}
function customParseQueryString(url) {
  if (!url) return [];
  const queryString = url.split("?")[1];
  const parsedParams = querystring.parse(queryString);
  const paramsArray = [];
  for (const key in parsedParams) paramsArray.push([key, parsedParams[key]]);
  return paramsArray;
}
function encodeStr(str) {
  const len = str.length;
  if (len === 0) return str;
  const firstNullIndex = str.indexOf("\0");
  if (firstNullIndex === -1) return str;
  const result = Array.from({ length: len + countNulls(str, firstNullIndex) });
  let pos = 0;
  for (let i = 0; i < firstNullIndex; i++) result[pos++] = str[i];
  for (let i = firstNullIndex; i < len; i++) {
    const char = str[i];
    if (char === "\0") {
      result[pos++] = "\\";
      result[pos++] = "0";
    } else result[pos++] = char;
  }
  return path.posix.normalize(result.join(""));
}
function decodeStr(str) {
  const len = str.length;
  if (len === 0) return str;
  const firstIndex = str.indexOf("\\0");
  if (firstIndex === -1) return str;
  const result = Array.from({ length: len - countBackslashZeros(str, firstIndex) });
  let pos = 0;
  for (let i2 = 0; i2 < firstIndex; i2++) result[pos++] = str[i2];
  let i = firstIndex;
  while (i < len) if (str[i] === "\\" && str[i + 1] === "0") {
    result[pos++] = "\0";
    i += 2;
  } else result[pos++] = str[i++];
  return path.posix.normalize(result.join(""));
}
function getContentValue(content) {
  if (content === null || content === void 0) throw new Error("Content cannot be null or undefined");
  return encodeStr(typeof content === "string" ? content : content.code || "");
}
function countNulls(str, startIndex) {
  let count = 0;
  const len = str.length;
  for (let i = startIndex; i < len; i++) if (str[i] === "\0") count++;
  return count;
}
function countBackslashZeros(str, startIndex) {
  let count = 0;
  const len = str.length;
  for (let i = startIndex; i < len - 1; i++) if (str[i] === "\\" && str[i + 1] === "0") {
    count++;
    i++;
  }
  return count;
}
function removeQuery(pathe) {
  const queryIndex = pathe.indexOf("?");
  if (queryIndex !== -1) return path.posix.normalize(pathe.slice(0, queryIndex));
  return path.posix.normalize(pathe);
}
function isStartsWithSlash(str) {
  return str?.startsWith("/");
}
function appendQuery(id, query) {
  if (!query.length) return id;
  return `${id}?${stringifyQuery(query)}`;
}
function stringifyQuery(query) {
  if (!query.length) return "";
  let queryStr = "";
  for (const [key, value] of query) queryStr += `${key}${value ? `=${value}` : ""}&`;
  return `${queryStr.slice(0, -1)}`;
}
var CSS_LANGS_RES = [
  [/\.(less)(?:$|\?)/, "less"],
  [/\.(scss|sass)(?:$|\?)/, "sass"],
  [/\.(styl|stylus)(?:$|\?)/, "stylus"],
  [/\.(css)(?:$|\?)/, "css"]
];
var JS_LANGS_RES = [
  [/\.(js|mjs|cjs)(?:$|\?)/, "js"],
  [/\.(jsx)(?:$|\?)/, "jsx"],
  [/\.(ts|cts|mts)(?:$|\?)/, "ts"],
  [/\.(tsx)(?:$|\?)/, "tsx"]
];
function getCssModuleType(id) {
  for (const [reg, lang] of CSS_LANGS_RES) if (reg.test(id)) return lang;
  return null;
}
function getJsModuleType(id) {
  for (const [reg, lang] of JS_LANGS_RES) if (reg.test(id)) return lang;
  return null;
}
function formatLoadModuleType(id) {
  const cssModuleType = getCssModuleType(id);
  if (cssModuleType) return cssModuleType;
  const jsModuleType = getJsModuleType(id);
  if (jsModuleType) return jsModuleType;
  return "js";
}
function formatTransformModuleType(id) {
  return formatLoadModuleType(id);
}
function getFarmPlugin(factory) {
  return ((userOptions) => {
    const plugins = toArray(factory(userOptions, {
      framework: "farm",
      versions: { unplugin: version$1 }
    })).map((rawPlugin) => {
      const plugin = toFarmPlugin(rawPlugin, userOptions);
      if (rawPlugin.farm) Object.assign(plugin, rawPlugin.farm);
      return plugin;
    });
    return plugins.length === 1 ? plugins[0] : plugins;
  });
}
function toFarmPlugin(plugin, options) {
  const farmPlugin = {
    name: plugin.name,
    priority: convertEnforceToPriority(plugin.enforce)
  };
  if (plugin.farm) Object.keys(plugin.farm).forEach((key) => {
    const value = plugin.farm[key];
    if (value) Reflect.set(farmPlugin, key, value);
  });
  if (plugin.buildStart) {
    const _buildStart = plugin.buildStart;
    farmPlugin.buildStart = { async executor(_, context) {
      await _buildStart.call(createFarmContext(context));
    } };
  }
  if (plugin.resolveId) {
    const _resolveId = plugin.resolveId;
    let filters = [];
    if (options) filters = options?.filters ?? [];
    farmPlugin.resolve = {
      filters: {
        sources: filters.length ? filters : [".*"],
        importers: [".*"]
      },
      async executor(params, context) {
        const resolvedIdPath = path.resolve(params.importer ?? "");
        const id = decodeStr(params.source);
        const { handler, filter } = normalizeObjectHook("resolveId", _resolveId);
        if (!filter(id)) return null;
        let isEntry = false;
        if (isObject(params.kind) && "entry" in params.kind) isEntry = params.kind.entry === "index";
        const farmContext = createFarmContext(context, resolvedIdPath);
        const resolveIdResult = await handler.call(Object.assign(unpluginContext(context), farmContext), id, resolvedIdPath ?? null, { isEntry });
        if (isString(resolveIdResult)) return {
          resolvedPath: removeQuery(encodeStr(resolveIdResult)),
          query: customParseQueryString(resolveIdResult),
          sideEffects: true,
          external: false,
          meta: {}
        };
        if (isObject(resolveIdResult)) return {
          resolvedPath: removeQuery(encodeStr(resolveIdResult?.id)),
          query: customParseQueryString(resolveIdResult?.id),
          sideEffects: false,
          external: Boolean(resolveIdResult?.external),
          meta: {}
        };
        if (!isStartsWithSlash(params.source)) return null;
      }
    };
  }
  if (plugin.load) {
    const _load = plugin.load;
    farmPlugin.load = {
      filters: { resolvedPaths: [".*"] },
      async executor(params, context) {
        const id = appendQuery(decodeStr(params.resolvedPath), params.query);
        const loader = formatTransformModuleType(id);
        if (plugin.loadInclude && !plugin.loadInclude?.(id)) return null;
        const { handler, filter } = normalizeObjectHook("load", _load);
        if (!filter(id)) return null;
        const farmContext = createFarmContext(context, id);
        return {
          content: getContentValue(await handler.call(Object.assign(unpluginContext(context), farmContext), id)),
          moduleType: loader
        };
      }
    };
  }
  if (plugin.transform) {
    const _transform = plugin.transform;
    farmPlugin.transform = {
      filters: {
        resolvedPaths: [".*"],
        moduleTypes: [".*"]
      },
      async executor(params, context) {
        const id = appendQuery(decodeStr(params.resolvedPath), params.query);
        const loader = formatTransformModuleType(id);
        if (plugin.transformInclude && !plugin.transformInclude(id)) return null;
        const { handler, filter } = normalizeObjectHook("transform", _transform);
        if (!filter(id, params.content)) return null;
        const farmContext = createFarmContext(context, id);
        const resource = await handler.call(Object.assign(unpluginContext(context), farmContext), params.content, id);
        if (resource && typeof resource !== "string") return {
          content: getContentValue(resource),
          moduleType: loader,
          sourceMap: typeof resource.map === "object" && resource.map !== null ? JSON.stringify(resource.map) : void 0
        };
      }
    };
  }
  if (plugin.watchChange) {
    const _watchChange = plugin.watchChange;
    farmPlugin.updateModules = { async executor(param, context) {
      const updatePathContent = param.paths[0];
      const ModifiedPath = updatePathContent[0];
      const eventChange = convertWatchEventChange(updatePathContent[1]);
      await _watchChange.call(createFarmContext(context), ModifiedPath, { event: eventChange });
    } };
  }
  if (plugin.buildEnd) {
    const _buildEnd = plugin.buildEnd;
    farmPlugin.buildEnd = { async executor(_, context) {
      await _buildEnd.call(createFarmContext(context));
    } };
  }
  if (plugin.writeBundle) {
    const _writeBundle = plugin.writeBundle;
    farmPlugin.finish = { async executor() {
      await _writeBundle();
    } };
  }
  return farmPlugin;
}
function getRollupPlugin(factory) {
  return ((userOptions) => {
    const meta = {
      framework: "rollup",
      versions: { unplugin: version$1 }
    };
    const plugins = toArray(factory(userOptions, meta)).map((plugin) => toRollupPlugin(plugin, "rollup", meta));
    return plugins.length === 1 ? plugins[0] : plugins;
  });
}
function toRollupPlugin(plugin, key, meta) {
  const nativeFilter = key === "rolldown";
  if (plugin.resolveId && !nativeFilter && typeof plugin.resolveId === "object" && plugin.resolveId.filter) {
    const resolveIdHook = plugin.resolveId;
    const { handler, filter } = normalizeObjectHook("resolveId", resolveIdHook);
    replaceHookHandler("resolveId", resolveIdHook, function(...args) {
      const [id] = args;
      if (!supportNativeFilter(this, key) && !filter(id)) return;
      return handler.apply(this, args);
    });
  }
  if (plugin.load && (plugin.loadInclude || !nativeFilter && typeof plugin.load === "object" && plugin.load.filter)) {
    const loadHook = plugin.load;
    const { handler, filter } = normalizeObjectHook("load", loadHook);
    replaceHookHandler("load", loadHook, function(...args) {
      const [id] = args;
      if (plugin.loadInclude && !plugin.loadInclude(id)) return;
      if (!supportNativeFilter(this, key) && !filter(id)) return;
      return handler.apply(this, args);
    });
  }
  if (plugin.transform && (plugin.transformInclude || !nativeFilter && typeof plugin.transform === "object" && plugin.transform.filter)) {
    const transformHook = plugin.transform;
    const { handler, filter } = normalizeObjectHook("transform", transformHook);
    replaceHookHandler("transform", transformHook, function(...args) {
      const [code, id] = args;
      if (plugin.transformInclude && !plugin.transformInclude(id)) return;
      if (!supportNativeFilter(this, key) && !filter(id, code)) return;
      return handler.apply(this, args);
    });
  }
  if (plugin[key]) Object.assign(plugin, plugin[key]);
  const buildStartHook = plugin.buildStart;
  const buildStartHandler = typeof buildStartHook === "object" ? buildStartHook?.handler : buildStartHook;
  replaceHookHandler("buildStart", buildStartHook, function(...args) {
    const versions = { unplugin: version$1 };
    const viteVersion = this?.meta?.viteVersion;
    if (viteVersion) versions.vite = viteVersion;
    const rollupVersion = this?.meta?.rollupVersion;
    if (rollupVersion) versions.rollup = rollupVersion;
    const rolldownVersion = this?.meta?.rolldownVersion;
    if (rolldownVersion) versions.rolldown = rolldownVersion;
    const unloaderVersion = this?.meta?.unloaderVersion;
    if (unloaderVersion) versions.unloader = unloaderVersion;
    meta.versions = versions;
    return buildStartHandler?.apply(this, args);
  });
  return plugin;
  function replaceHookHandler(name, hook, handler) {
    if (typeof hook === "object") hook.handler = handler;
    else plugin[name] = handler;
  }
}
function supportNativeFilter(context, framework) {
  if (framework === "vite") return !!context?.meta?.viteVersion;
  if (framework === "rolldown") return true;
  const rollupVersion = context?.meta?.rollupVersion;
  if (!rollupVersion) return false;
  const [major, minor] = rollupVersion.split(".");
  return Number(major) > 4 || Number(major) === 4 && Number(minor) >= 40;
}
function getRolldownPlugin(factory) {
  return ((userOptions) => {
    const meta = {
      framework: "rolldown",
      versions: { unplugin: version$1 }
    };
    const plugins = toArray(factory(userOptions, meta)).map((rawPlugin) => {
      return toRollupPlugin(rawPlugin, "rolldown", meta);
    });
    return plugins.length === 1 ? plugins[0] : plugins;
  });
}
var TRANSFORM_LOADER$1 = resolve6(import.meta.dirname, "rspack/loaders/transform.mjs");
var LOAD_LOADER$1 = resolve6(import.meta.dirname, "rspack/loaders/load.mjs");
function getRspackVersion(compiler) {
  return compiler.rspack.rspackVersion ?? compiler.rspack.version;
}
function getRspackPlugin(factory) {
  return (userOptions) => {
    return { apply(compiler) {
      const meta = {
        framework: "rspack",
        versions: {
          rspack: getRspackVersion(compiler),
          unplugin: version$1
        },
        rspack: { compiler }
      };
      applyRspackPlugins(compiler, toArray(factory(userOptions, meta)), meta);
    } };
  };
}
function getRspackPluginFromRaw(rawPlugins, meta) {
  return { apply(compiler) {
    applyRspackPlugins(compiler, rawPlugins, meta);
  } };
}
function applyRspackPlugins(compiler, rawPlugins, meta) {
  const VIRTUAL_MODULE_PREFIX = resolve6(compiler.options.context ?? process.cwd(), "node_modules/.virtual", compiler.rspack.experiments.VirtualModulesPlugin ? "" : process.pid.toString());
  meta.versions = {
    ...meta.versions,
    rspack: getRspackVersion(compiler),
    unplugin: meta.versions.unplugin ?? version$1
  };
  if (meta.framework === "rspack") meta.rspack.compiler = compiler;
  for (const rawPlugin of rawPlugins) {
    const plugin = Object.assign({}, rawPlugin, {
      __unpluginMeta: meta,
      __virtualModulePrefix: VIRTUAL_MODULE_PREFIX
    });
    const externalModules = /* @__PURE__ */ new Set();
    if (plugin.resolveId) {
      const vfs = compiler.rspack.experiments.VirtualModulesPlugin ? new compiler.rspack.experiments.VirtualModulesPlugin() : new FakeVirtualModulesPlugin(plugin);
      vfs.apply(compiler);
      const vfsModules = /* @__PURE__ */ new Map();
      plugin.__vfsModules = vfsModules;
      plugin.__vfs = vfs;
      compiler.hooks.compilation.tap(plugin.name, (compilation, { normalModuleFactory }) => {
        normalModuleFactory.hooks.resolve.tapPromise(plugin.name, async (resolveData) => {
          const id = normalizeAbsolutePath(resolveData.request);
          const requestContext = resolveData.contextInfo;
          let importer = requestContext.issuer !== "" ? requestContext.issuer : void 0;
          const isEntry = requestContext.issuer === "";
          if (importer?.startsWith(plugin.__virtualModulePrefix)) importer = decodeURIComponent(importer.slice(plugin.__virtualModulePrefix.length));
          const context = createBuildContext(compiler, compilation);
          let error;
          const pluginContext = {
            error(msg) {
              if (error == null) error = normalizeMessage(msg);
              else console.error(`unplugin/rspack: multiple errors returned from resolveId hook: ${msg}`);
            },
            warn(msg) {
              console.warn(`unplugin/rspack: warning from resolveId hook: ${msg}`);
            }
          };
          const { handler, filter } = normalizeObjectHook("resolveId", plugin.resolveId);
          if (!filter(id)) return;
          const resolveIdResult = await handler.call({
            ...context,
            ...pluginContext
          }, id, importer, { isEntry });
          if (error != null) throw error;
          if (resolveIdResult == null) return;
          let resolved = typeof resolveIdResult === "string" ? resolveIdResult : resolveIdResult.id;
          if (typeof resolveIdResult === "string" ? false : resolveIdResult.external === true) externalModules.add(resolved);
          let isVirtual = true;
          try {
            (compiler.inputFileSystem?.statSync ?? fs2.statSync)(resolved);
            isVirtual = false;
          } catch {
            isVirtual = !isVirtualModuleId(resolved, plugin);
          }
          if (isVirtual) {
            const encodedVirtualPath = encodeVirtualModuleId(resolved, plugin);
            if (!vfsModules.has(resolved)) {
              const fsPromise = Promise.resolve(vfs.writeModule(encodedVirtualPath, ""));
              vfsModules.set(resolved, fsPromise);
              await fsPromise;
            } else await vfsModules.get(resolved);
            resolved = encodedVirtualPath;
          }
          resolveData.request = resolved;
        });
      });
    }
    if (plugin.load) compiler.options.module.rules.unshift({
      enforce: plugin.enforce,
      include(id) {
        if (isVirtualModuleId(id, plugin)) id = decodeVirtualModuleId(id, plugin);
        if (plugin.loadInclude && !plugin.loadInclude(id)) return false;
        const { filter } = normalizeObjectHook("load", plugin.load);
        if (!filter(id)) return false;
        return !externalModules.has(id);
      },
      use: [{
        loader: LOAD_LOADER$1,
        options: { plugin }
      }],
      type: "javascript/auto"
    });
    if (plugin.transform) compiler.options.module.rules.unshift({
      enforce: plugin.enforce,
      use(data) {
        return transformUse(data, plugin, TRANSFORM_LOADER$1);
      }
    });
    if (meta.framework === "rspack" && plugin.rspack) plugin.rspack(compiler);
    if (plugin.watchChange || plugin.buildStart) compiler.hooks.make.tapPromise(plugin.name, async (compilation) => {
      const context = createBuildContext(compiler, compilation);
      if (plugin.watchChange && (compiler.modifiedFiles || compiler.removedFiles)) {
        const promises = [];
        if (compiler.modifiedFiles) compiler.modifiedFiles.forEach((file) => promises.push(Promise.resolve(plugin.watchChange.call(context, file, { event: "update" }))));
        if (compiler.removedFiles) compiler.removedFiles.forEach((file) => promises.push(Promise.resolve(plugin.watchChange.call(context, file, { event: "delete" }))));
        await Promise.all(promises);
      }
      if (plugin.buildStart) return await plugin.buildStart.call(context);
    });
    if (plugin.buildEnd) compiler.hooks.emit.tapPromise(plugin.name, async (compilation) => {
      await plugin.buildEnd.call(createBuildContext(compiler, compilation));
    });
    if (plugin.writeBundle) compiler.hooks.afterEmit.tapPromise(plugin.name, async () => {
      await plugin.writeBundle();
    });
  }
}
function getRsbuildPlugin(factory) {
  return (userOptions) => {
    const meta = {
      framework: "rsbuild",
      versions: { unplugin: version$1 }
    };
    const plugins = toArray(factory(userOptions, meta)).map((rawPlugin) => toRsbuildPlugin(rawPlugin, meta));
    return plugins.length === 1 ? plugins[0] : plugins;
  };
}
function toRsbuildPlugin(rawPlugin, meta) {
  const rsbuildOptions = rawPlugin.rsbuild;
  return {
    ...rsbuildOptions,
    name: rsbuildOptions?.name ?? rawPlugin.name,
    enforce: rsbuildOptions?.enforce ?? rawPlugin.enforce,
    async setup(api) {
      meta.versions = {
        ...meta.versions,
        rsbuild: api.context.version,
        unplugin: meta.versions.unplugin ?? version$1
      };
      api.modifyRspackConfig((config) => {
        config.plugins.push(getRspackPluginFromRaw([rawPlugin], meta));
      });
      await rsbuildOptions?.setup?.(api);
    }
  };
}
function getUnloaderPlugin(factory) {
  return ((userOptions) => {
    const meta = {
      framework: "unloader",
      versions: { unplugin: version$1 }
    };
    const plugins = toArray(factory(userOptions, meta)).map((rawPlugin) => {
      return toRollupPlugin(rawPlugin, "unloader", meta);
    });
    return plugins.length === 1 ? plugins[0] : plugins;
  });
}
function getVitePlugin(factory) {
  return ((userOptions) => {
    const meta = {
      framework: "vite",
      versions: { unplugin: version$1 }
    };
    const plugins = toArray(factory(userOptions, meta)).map((rawPlugin) => {
      return toRollupPlugin(rawPlugin, "vite", meta);
    });
    return plugins.length === 1 ? plugins[0] : plugins;
  });
}
var TRANSFORM_LOADER = resolve6(import.meta.dirname, "webpack/loaders/transform.mjs");
var LOAD_LOADER = resolve6(import.meta.dirname, "webpack/loaders/load.mjs");
function getWebpackPlugin(factory) {
  return (userOptions) => {
    const VirtualModulesPlugin = __require("webpack-virtual-modules");
    return { apply(compiler) {
      const VIRTUAL_MODULE_PREFIX = resolve6(compiler.options.context ?? process$1.cwd(), "_virtual_");
      const meta = {
        framework: "webpack",
        versions: {
          webpack: compiler.webpack?.version,
          unplugin: version$1
        },
        webpack: { compiler }
      };
      const rawPlugins = toArray(factory(userOptions, meta));
      for (const rawPlugin of rawPlugins) {
        const plugin = Object.assign(rawPlugin, {
          __unpluginMeta: meta,
          __virtualModulePrefix: VIRTUAL_MODULE_PREFIX
        });
        const externalModules = /* @__PURE__ */ new Set();
        if (plugin.resolveId) {
          let vfs = compiler.options.plugins.find((i) => i instanceof VirtualModulesPlugin);
          if (!vfs) {
            vfs = new VirtualModulesPlugin();
            compiler.options.plugins.push(vfs);
          }
          const vfsModules = /* @__PURE__ */ new Set();
          plugin.__vfsModules = vfsModules;
          plugin.__vfs = vfs;
          const resolverPlugin = { apply(resolver2) {
            const target = resolver2.ensureHook("resolve");
            resolver2.getHook("resolve").tapAsync(plugin.name, async (request, resolveContext, callback) => {
              if (!request.request) return callback();
              if (normalizeAbsolutePath(request.request).startsWith(plugin.__virtualModulePrefix)) return callback();
              const id = normalizeAbsolutePath(request.request);
              const requestContext = request.context;
              let importer = requestContext.issuer !== "" ? requestContext.issuer : void 0;
              const isEntry = requestContext.issuer === "";
              if (importer?.startsWith(plugin.__virtualModulePrefix)) importer = decodeURIComponent(importer.slice(plugin.__virtualModulePrefix.length));
              const fileDependencies = /* @__PURE__ */ new Set();
              const context = createBuildContext2({
                addWatchFile(file) {
                  fileDependencies.add(file);
                  resolveContext.fileDependencies?.add(file);
                },
                getWatchFiles() {
                  return Array.from(fileDependencies);
                }
              }, compiler);
              let error;
              const pluginContext = {
                error(msg) {
                  if (error == null) error = normalizeMessage2(msg);
                  else console.error(`unplugin/webpack: multiple errors returned from resolveId hook: ${msg}`);
                },
                warn(msg) {
                  console.warn(`unplugin/webpack: warning from resolveId hook: ${msg}`);
                }
              };
              const { handler, filter } = normalizeObjectHook("resolveId", plugin.resolveId);
              if (!filter(id)) return callback();
              const resolveIdResult = await handler.call({
                ...context,
                ...pluginContext
              }, id, importer, { isEntry });
              if (error != null) return callback(error);
              if (resolveIdResult == null) return callback();
              let resolved = typeof resolveIdResult === "string" ? resolveIdResult : resolveIdResult.id;
              if (typeof resolveIdResult === "string" ? false : resolveIdResult.external === true) externalModules.add(resolved);
              if (!fs2.existsSync(resolved)) {
                resolved = normalizeAbsolutePath(plugin.__virtualModulePrefix + encodeURIComponent(resolved));
                if (!vfsModules.has(resolved)) {
                  plugin.__vfs.writeModule(resolved, "");
                  vfsModules.add(resolved);
                }
              }
              const newRequest = {
                ...request,
                request: resolved
              };
              resolver2.doResolve(target, newRequest, null, resolveContext, callback);
            });
          } };
          compiler.options.resolve.plugins = compiler.options.resolve.plugins || [];
          compiler.options.resolve.plugins.push(resolverPlugin);
        }
        if (plugin.load) compiler.options.module.rules.unshift({
          include(id) {
            return shouldLoad(id, plugin, externalModules);
          },
          enforce: plugin.enforce,
          use: [{
            loader: LOAD_LOADER,
            options: { plugin }
          }],
          type: "javascript/auto"
        });
        if (plugin.transform) compiler.options.module.rules.unshift({
          enforce: plugin.enforce,
          use(data) {
            return transformUse(data, plugin, TRANSFORM_LOADER);
          }
        });
        if (plugin.webpack) plugin.webpack(compiler);
        if (plugin.watchChange || plugin.buildStart) compiler.hooks.make.tapPromise(plugin.name, async (compilation) => {
          const context = createBuildContext2(contextOptionsFromCompilation(compilation), compiler, compilation);
          if (plugin.watchChange && (compiler.modifiedFiles || compiler.removedFiles)) {
            const promises = [];
            if (compiler.modifiedFiles) compiler.modifiedFiles.forEach((file) => promises.push(Promise.resolve(plugin.watchChange.call(context, file, { event: "update" }))));
            if (compiler.removedFiles) compiler.removedFiles.forEach((file) => promises.push(Promise.resolve(plugin.watchChange.call(context, file, { event: "delete" }))));
            await Promise.all(promises);
          }
          if (plugin.buildStart) return await plugin.buildStart.call(context);
        });
        if (plugin.buildEnd) compiler.hooks.emit.tapPromise(plugin.name, async (compilation) => {
          await plugin.buildEnd.call(createBuildContext2(contextOptionsFromCompilation(compilation), compiler, compilation));
        });
        if (plugin.writeBundle) compiler.hooks.afterEmit.tapPromise(plugin.name, async () => {
          await plugin.writeBundle();
        });
      }
    } };
  };
}
function shouldLoad(id, plugin, externalModules) {
  if (id.startsWith(plugin.__virtualModulePrefix)) id = decodeURIComponent(id.slice(plugin.__virtualModulePrefix.length));
  if (plugin.loadInclude && !plugin.loadInclude(id)) return false;
  const { filter } = normalizeObjectHook("load", plugin.load);
  if (!filter(id)) return false;
  return !externalModules.has(id);
}
function createUnplugin(factory) {
  return {
    get esbuild() {
      return getEsbuildPlugin(factory);
    },
    get rollup() {
      return getRollupPlugin(factory);
    },
    get vite() {
      return getVitePlugin(factory);
    },
    get rolldown() {
      return getRolldownPlugin(factory);
    },
    get webpack() {
      return getWebpackPlugin(factory);
    },
    get rspack() {
      return getRspackPlugin(factory);
    },
    get rsbuild() {
      return getRsbuildPlugin(factory);
    },
    get farm() {
      return getFarmPlugin(factory);
    },
    get unloader() {
      return getUnloaderPlugin(factory);
    },
    get bun() {
      return getBunPlugin(factory);
    },
    get raw() {
      return factory;
    }
  };
}

// node/shared/common/constants.ts
var PLUGIN_NAME = "unix-router-route-gen";
var PAGES_GEN_PLUGIN_NAME = "unix-router-pages-gen";
var ROUTES_GEN_PLUGIN_NAME = "unix-router-routes-gen";
var LOG_PREFIX = "[unix-router:route-gen]";
var PAGES_GEN_LOG_PREFIX = "[unix-router:pages-gen]";
var ROUTES_GEN_LOG_PREFIX = "[unix-router:routes-gen]";
var ROUTE_CONFIG_BLOCK_ID = "route-config";
var BLOCK_VIRTUAL_PREFIX = "\0unix-router-route-config:";
function isRouteConfigBlockRequest(id) {
  return id.includes(ROUTE_CONFIG_BLOCK_ID);
}

// node/shared/parsing/literal.ts
var LiteralParseError = class extends Error {
};
var IDENT_START = /[A-Za-z_$]/;
var Parser = class {
  constructor(src) {
    this.src = src;
  }
  src;
  pos = 0;
  /** 入口：解析一个对象字面量（期望首字符为 '{'） */
  parseObjectLiteral() {
    this.skipWs();
    if (this.peek() !== "{") {
      throw new LiteralParseError(`\u671F\u671B\u5BF9\u8C61\u5B57\u9762\u91CF '{'\uFF0C\u5B9E\u9645 '${this.peek()}'\uFF08\u4F4D\u7F6E ${this.pos}\uFF09`);
    }
    return this.parseValue();
  }
  /** 入口：解析一个数组字面量（期望首字符为 '['） */
  parseArrayLiteral() {
    this.skipWs();
    if (this.peek() !== "[") {
      throw new LiteralParseError(`\u671F\u671B\u6570\u7EC4\u5B57\u9762\u91CF '['\uFF0C\u5B9E\u9645 '${this.peek()}'\uFF08\u4F4D\u7F6E ${this.pos}\uFF09`);
    }
    return this.parseArray();
  }
  peek() {
    return this.src.charAt(this.pos) || "<eof>";
  }
  skipWs() {
    while (this.pos < this.src.length) {
      const c = this.src[this.pos];
      if (c === " " || c === "	" || c === "\n" || c === "\r") {
        this.pos++;
        continue;
      }
      if (c === "/" && this.src[this.pos + 1] === "/") {
        const end = this.src.indexOf("\n", this.pos);
        this.pos = end < 0 ? this.src.length : end;
        continue;
      }
      if (c === "/" && this.src[this.pos + 1] === "*") {
        const end = this.src.indexOf("*/", this.pos + 2);
        this.pos = end < 0 ? this.src.length : end + 2;
        continue;
      }
      break;
    }
  }
  parseValue() {
    this.skipWs();
    const c = this.peek();
    if (c === "{") return this.parseObject();
    if (c === "[") return this.parseArray();
    if (c === "'" || c === '"') return this.parseQuotedString();
    if (c === "`") return this.parseTemplate();
    if (/[0-9]/.test(c) || c === "-" && /[0-9]/.test(this.src.charAt(this.pos + 1))) return this.parseNumber();
    if (IDENT_START.test(c)) return this.parseIdentLike();
    if (c === "(") return { kind: "raw", value: this.captureRaw() };
    throw new LiteralParseError(`\u65E0\u6CD5\u89E3\u6790\u7684\u5B57\u7B26 '${c}'\uFF08\u4F4D\u7F6E ${this.pos}\uFF09`);
  }
  parseObject() {
    this.pos++;
    const entries = [];
    while (true) {
      this.skipWs();
      if (this.peek() === "}") {
        this.pos++;
        return { kind: "object", entries };
      }
      if (this.peek() === ",") {
        this.pos++;
        continue;
      }
      let key;
      const c = this.peek();
      if (c === "'" || c === '"') {
        key = this.parseQuotedString().value;
      } else if (IDENT_START.test(c)) {
        const start = this.pos;
        while (this.pos < this.src.length && /[A-Za-z0-9_$]/.test(this.src[this.pos])) this.pos++;
        key = this.src.slice(start, this.pos);
      } else {
        throw new LiteralParseError(`\u975E\u6CD5\u5C5E\u6027\u540D '${c}'\uFF08\u4F4D\u7F6E ${this.pos}\uFF09`);
      }
      this.skipWs();
      if (this.peek() !== ":") {
        throw new LiteralParseError(`\u5C5E\u6027 '${key}' \u540E\u671F\u671B ':'\uFF0C\u5B9E\u9645 '${this.peek()}'\uFF08\u4F4D\u7F6E ${this.pos}\uFF09`);
      }
      this.pos++;
      const value = this.parseValue();
      entries.push({ key, value });
    }
  }
  parseArray() {
    this.pos++;
    const items = [];
    while (true) {
      this.skipWs();
      if (this.peek() === "]") {
        this.pos++;
        return { kind: "array", items };
      }
      if (this.peek() === ",") {
        this.pos++;
        continue;
      }
      items.push(this.parseValue());
    }
  }
  parseQuotedString() {
    const quote2 = this.src[this.pos];
    this.pos++;
    let out = "";
    while (this.pos < this.src.length) {
      const c = this.src[this.pos];
      if (c === "\\") {
        const next = this.src[this.pos + 1];
        const map = { n: "\n", t: "	", r: "\r", "'": "'", '"': '"', "\\": "\\" };
        out += next !== void 0 && next in map ? map[next] : next ?? "";
        this.pos += 2;
        continue;
      }
      if (c === quote2) {
        this.pos++;
        return { kind: "string", value: out };
      }
      out += c;
      this.pos++;
    }
    throw new LiteralParseError(`\u5B57\u7B26\u4E32\u672A\u95ED\u5408\uFF08\u4F4D\u7F6E ${this.pos}\uFF09`);
  }
  parseTemplate() {
    const start = this.pos;
    this.pos++;
    while (this.pos < this.src.length) {
      const c = this.src[this.pos];
      if (c === "\\") {
        this.pos += 2;
        continue;
      }
      if (c === "`") {
        this.pos++;
        return { kind: "raw", value: this.src.slice(start, this.pos) };
      }
      this.pos++;
    }
    throw new LiteralParseError(`\u6A21\u677F\u5B57\u7B26\u4E32\u672A\u95ED\u5408\uFF08\u4F4D\u7F6E ${this.pos}\uFF09`);
  }
  parseNumber() {
    const rest = this.src.slice(this.pos);
    const m = /^-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/.exec(rest);
    if (m === null) throw new LiteralParseError(`\u975E\u6CD5\u6570\u5B57\uFF08\u4F4D\u7F6E ${this.pos}\uFF09`);
    this.pos += m[0].length;
    return { kind: "number", value: parseFloat(m[0]) };
  }
  parseIdentLike() {
    const start = this.pos;
    while (this.pos < this.src.length && /[A-Za-z0-9_$]/.test(this.src[this.pos])) this.pos++;
    const ident = this.src.slice(start, this.pos);
    if (ident === "true") return { kind: "boolean", value: true };
    if (ident === "false") return { kind: "boolean", value: false };
    if (ident === "null") return { kind: "null" };
    this.pos = start;
    return { kind: "raw", value: this.captureRaw() };
  }
  /** 从当前位置扫描一个完整表达式原文，直到顶层（深度 0）出现 ',' '}' ']' 或结尾 */
  captureRaw() {
    const start = this.pos;
    let depth = 0;
    while (this.pos < this.src.length) {
      const c = this.src[this.pos];
      if (c === "'" || c === '"') {
        this.skipQuoted();
        continue;
      }
      if (c === "`") {
        this.skipTemplate();
        continue;
      }
      if (c === "/" && this.src[this.pos + 1] === "/") {
        const end = this.src.indexOf("\n", this.pos);
        this.pos = end < 0 ? this.src.length : end;
        continue;
      }
      if (c === "/" && this.src[this.pos + 1] === "*") {
        const end = this.src.indexOf("*/", this.pos + 2);
        this.pos = end < 0 ? this.src.length : end + 2;
        continue;
      }
      if (c === "(" || c === "[" || c === "{") depth++;
      if (c === ")" || c === "]" || c === "}") {
        if (depth === 0) break;
        depth--;
      }
      if (depth === 0 && c === ",") break;
      this.pos++;
    }
    return this.src.slice(start, this.pos).trim();
  }
  skipQuoted() {
    const quote2 = this.src[this.pos];
    this.pos++;
    while (this.pos < this.src.length) {
      const c = this.src[this.pos];
      if (c === "\\") {
        this.pos += 2;
        continue;
      }
      if (c === quote2) {
        this.pos++;
        return;
      }
      this.pos++;
    }
  }
  skipTemplate() {
    this.pos++;
    while (this.pos < this.src.length) {
      const c = this.src[this.pos];
      if (c === "\\") {
        this.pos += 2;
        continue;
      }
      if (c === "`") {
        this.pos++;
        return;
      }
      this.pos++;
    }
  }
};
function parseUtsObjectLiteral(text) {
  return new Parser(text).parseObjectLiteral();
}
function parseUtsArrayLiteral(text) {
  return new Parser(text).parseArrayLiteral();
}
function parseJsonc(text) {
  let out = "";
  let pos = 0;
  while (pos < text.length) {
    const c = text[pos];
    if (c === "'" || c === '"') {
      const quote2 = c;
      out += c;
      pos++;
      while (pos < text.length) {
        const ch = text[pos];
        out += ch;
        if (ch === "\\") {
          out += text[pos + 1] ?? "";
          pos += 2;
          continue;
        }
        pos++;
        if (ch === quote2) break;
      }
      continue;
    }
    if (c === "/" && text[pos + 1] === "/") {
      const end = text.indexOf("\n", pos);
      if (end < 0) break;
      out += " ";
      pos = end;
      continue;
    }
    if (c === "/" && text[pos + 1] === "*") {
      const end = text.indexOf("*/", pos + 2);
      pos = end < 0 ? text.length : end + 2;
      out += " ";
      continue;
    }
    if (c === ",") {
      let look = pos + 1;
      while (look < text.length && /\s/.test(text[look])) look++;
      if (text[look] === "}" || text[look] === "]") {
        out += " ";
        pos++;
        continue;
      }
    }
    out += c;
    pos++;
  }
  return JSON.parse(out);
}

// node/shared/parsing/extract.ts
var emptySpec = () => ({
  title: null,
  name: null,
  isTab: false,
  order: null,
  iconPath: null,
  selectedIconPath: null,
  tabText: null,
  metaExtra: [],
  beforeEnter: null,
  redirect: null,
  unknownFields: []
});
function stripDefineUniPage(code) {
  const re = /\bdefineUniPage\s*\(/g;
  const starts = [];
  let m;
  while ((m = re.exec(code)) !== null) starts.push(m.index);
  if (starts.length === 0) return { code, spec: null, error: null };
  if (starts.length > 1) {
    return { code, spec: null, error: `defineUniPage \u6BCF\u9875\u81F3\u591A\u58F0\u660E\u4E00\u6B21\uFF0C\u53D1\u73B0 ${starts.length} \u5904` };
  }
  const start = starts[0];
  const parenStart = code.indexOf("(", start);
  let depth = 0;
  let closeParen = -1;
  for (let i = parenStart; i < code.length; i++) {
    const c = code[i];
    if (c === "'" || c === '"') {
      const quote2 = c;
      i++;
      while (i < code.length) {
        if (code[i] === "\\") {
          i++;
        } else if (code[i] === quote2) {
          break;
        }
        i++;
      }
      continue;
    }
    if (c === "(") depth++;
    if (c === ")") {
      depth--;
      if (depth === 0) {
        closeParen = i;
        break;
      }
    }
  }
  if (closeParen < 0) return { code, spec: null, error: "defineUniPage(...) \u62EC\u53F7\u672A\u95ED\u5408" };
  const argsText = code.slice(parenStart + 1, closeParen);
  let spec;
  try {
    const literal = parseUtsObjectLiteral(argsText.trim());
    if (literal.kind !== "object") return { code, spec: null, error: "defineUniPage \u53C2\u6570\u987B\u4E3A\u5BF9\u8C61\u5B57\u9762\u91CF" };
    spec = specFromEntries(literal.entries);
  } catch (e) {
    const msg = e instanceof LiteralParseError ? e.message : String(e);
    return { code, spec: null, error: `defineUniPage \u53C2\u6570\u89E3\u6790\u5931\u8D25\uFF1A${msg}` };
  }
  const matched = code.slice(start, closeParen + 1);
  const newlines = (matched.match(/\n/g) ?? []).length;
  const placeholder = "/* defineUniPage \u7531 @meng-xi/unix-router/vite-plugin \u5265\u79BB */" + "\n".repeat(newlines);
  return { code: code.slice(0, start) + placeholder + code.slice(closeParen + 1), spec, error: null };
}
function extractRouteConfigBlock(code) {
  const re = /<route-config([^>]*)>([\s\S]*?)<\/route-config>/g;
  const matches = [];
  let m;
  while ((m = re.exec(code)) !== null) matches.push(m);
  if (matches.length === 0) return { code, spec: null, error: null };
  if (matches.length > 1) {
    return { code, spec: null, error: `<route-config> \u6BCF\u9875\u81F3\u591A\u58F0\u660E\u4E00\u4E2A\uFF0C\u53D1\u73B0 ${matches.length} \u4E2A` };
  }
  const block = matches[0];
  const langMatch = /lang\s*=\s*["']?([\w-]+)["']?/.exec(block[1]);
  const lang = langMatch !== null ? langMatch[1] : "jsonc";
  try {
    let entries;
    if (lang === "uts") {
      const literal = parseUtsObjectLiteral(block[2].trim());
      if (literal.kind !== "object") return { code, spec: null, error: '<route-config lang="uts"> \u5185\u5BB9\u987B\u4E3A\u5BF9\u8C61\u5B57\u9762\u91CF' };
      entries = literal.entries;
    } else if (lang === "jsonc" || lang === "json") {
      const data = parseJsonc(block[2]);
      if (data === null || typeof data !== "object" || Array.isArray(data)) {
        return { code, spec: null, error: "<route-config> \u5185\u5BB9\u987B\u4E3A JSON \u5BF9\u8C61" };
      }
      entries = unknownToEntries(data);
    } else {
      return { code, spec: null, error: `\u4E0D\u652F\u6301\u7684 <route-config lang="${lang}">\uFF0C\u53EF\u7528\uFF1Ajsonc\uFF08\u9ED8\u8BA4\uFF09/ uts` };
    }
    return { code, spec: specFromEntries(entries), error: null };
  } catch (e) {
    const msg = e instanceof LiteralParseError ? e.message : String(e);
    return { code, spec: null, error: `<route-config> \u5185\u5BB9\u89E3\u6790\u5931\u8D25\uFF1A${msg}` };
  }
}
function mergeSpecs(macro, block) {
  if (macro === null) return block ?? emptySpec();
  if (block === null) return macro;
  const pick = (mv, bv) => mv !== null && mv !== false ? mv : bv;
  const merged = emptySpec();
  merged.title = pick(macro.title, block.title);
  merged.name = pick(macro.name, block.name);
  merged.isTab = macro.isTab || block.isTab;
  merged.order = pick(macro.order, block.order);
  merged.iconPath = pick(macro.iconPath, block.iconPath);
  merged.selectedIconPath = pick(macro.selectedIconPath, block.selectedIconPath);
  merged.tabText = pick(macro.tabText, block.tabText);
  merged.beforeEnter = pick(macro.beforeEnter, block.beforeEnter);
  merged.redirect = pick(macro.redirect, block.redirect);
  const metaKeys = new Set(macro.metaExtra.map((e) => e.key));
  merged.metaExtra = [...macro.metaExtra, ...block.metaExtra.filter((e) => !metaKeys.has(e.key))];
  merged.unknownFields = [...macro.unknownFields, ...block.unknownFields];
  return merged;
}
function specFromEntries(entries) {
  const spec = emptySpec();
  for (const { key, value } of entries) {
    switch (key) {
      case "title":
        if (value.kind === "string") spec.title = value.value;
        break;
      case "name":
        if (value.kind === "string") spec.name = value.value;
        break;
      case "isTab":
        if (value.kind === "boolean") spec.isTab = value.value;
        break;
      case "redirect":
        if (value.kind === "string") spec.redirect = value.value;
        break;
      case "beforeEnter":
        if (value.kind === "raw") spec.beforeEnter = value.value;
        break;
      case "tab":
        if (value.kind === "object") {
          for (const t of value.entries) {
            if (t.key === "order" && t.value.kind === "number") spec.order = t.value.value;
            if (t.key === "iconPath" && t.value.kind === "string") spec.iconPath = t.value.value;
            if (t.key === "selectedIconPath" && t.value.kind === "string") spec.selectedIconPath = t.value.value;
            if (t.key === "text" && t.value.kind === "string") spec.tabText = t.value.value;
          }
        }
        break;
      case "meta":
        if (value.kind === "object") spec.metaExtra = [...value.entries];
        break;
      default:
        spec.unknownFields.push(key);
    }
  }
  return spec;
}
function unknownToEntries(data) {
  const toLiteral = (v) => {
    if (typeof v === "string") return { kind: "string", value: v };
    if (typeof v === "number") return { kind: "number", value: v };
    if (typeof v === "boolean") return { kind: "boolean", value: v };
    if (v === null) return { kind: "null" };
    if (Array.isArray(v)) return { kind: "array", items: v.map(toLiteral) };
    if (typeof v === "object") return { kind: "object", entries: unknownToEntries(v) };
    return { kind: "raw", value: JSON.stringify(v) ?? "null" };
  };
  return Object.keys(data).map((key) => ({ key, value: toLiteral(data[key]) }));
}

// node/shared/rendering/generate.ts
import fs3 from "fs";
var toCamelSegment = (seg) => {
  const parts = seg.split(/[-_]+/).filter((p) => p !== "");
  if (parts.length === 0) return seg;
  return parts[0].charAt(0).toLowerCase() + parts[0].slice(1) + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
};
var capitalize = (s) => s === "" ? s : s.charAt(0).toUpperCase() + s.slice(1);
function fullPathName(pagePath, pagesDirName) {
  const segs = pagePath.split("/");
  if (segs.length > 1 && segs[0] === pagesDirName) segs.shift();
  return segs.map((s, i) => i === 0 ? toCamelSegment(s) : capitalize(toCamelSegment(s))).join("");
}
function buildNames(drafts, params, fail) {
  const pagesDirName = params.pagesDirName;
  for (const d of drafts) {
    if (d.name !== "") continue;
    if (params.nameStrategy === "fullPath") {
      d.name = fullPathName(d.path, pagesDirName);
    } else {
      const lastSeg = d.path.split("/").pop() ?? d.path;
      d.name = toCamelSegment(lastSeg);
    }
  }
  const countOf = () => {
    const count = /* @__PURE__ */ new Map();
    for (const d of drafts) count.set(d.name, (count.get(d.name) ?? 0) + 1);
    return count;
  };
  for (const d of drafts) {
    if ((countOf().get(d.name) ?? 0) > 1 && d.name !== fullPathName(d.path, pagesDirName)) {
      d.name = fullPathName(d.path, pagesDirName);
    }
  }
  const finalCount = /* @__PURE__ */ new Map();
  for (const d of drafts) {
    const list = finalCount.get(d.name) ?? [];
    list.push(d.path);
    finalCount.set(d.name, list);
  }
  const conflicts = [...finalCount.entries()].filter(([, paths]) => paths.length > 1);
  if (conflicts.length > 0) {
    fail("\u8DEF\u7531 name \u51B2\u7A81\uFF08\u672B\u6BB5\u4E0E\u5168\u8DEF\u5F84 camelCase \u5747\u65E0\u6CD5\u6D88\u89E3\uFF09\uFF1A\n" + conflicts.map(([name, paths]) => `  - ${name}: ${paths.join(", ")}`).join("\n"));
  }
}
function buildDrafts(scan, options) {
  const drafts = [];
  for (const page of scan.pages) {
    const spec = page.spec;
    const declaredName = spec?.name ?? null;
    const draft = {
      path: page.path,
      rel: page.rel,
      pkgRoot: page.pkgRoot,
      title: spec?.title ?? options.pages.titleFallback,
      isTab: spec?.isTab ?? false,
      order: spec?.order ?? null,
      iconPath: spec?.iconPath ?? null,
      selectedIconPath: spec?.selectedIconPath ?? null,
      tabText: spec?.tabText ?? null,
      name: declaredName ?? "",
      metaExtra: spec?.metaExtra ?? [],
      beforeEnter: spec?.beforeEnter ?? null,
      redirect: spec?.redirect ?? null
    };
    drafts.push(draft);
  }
  const entry = options.pages.entryPage;
  if (entry !== null) {
    const idx = drafts.findIndex((d) => d.path === entry);
    if (idx >= 0) {
      const [d] = drafts.splice(idx, 1);
      const firstMain = drafts.findIndex((x) => x.pkgRoot === null);
      drafts.splice(firstMain < 0 ? 0 : firstMain, 0, d);
    }
  }
  return drafts;
}
var quote = (s) => "'" + s.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
function renderLiteral(v) {
  switch (v.kind) {
    case "string":
      return quote(v.value);
    case "number":
      return String(v.value);
    case "boolean":
      return v.value ? "true" : "false";
    case "null":
      return "null";
    case "raw":
      return v.value;
    case "array":
      return "[ " + v.items.map(renderLiteral).join(", ") + " ]";
    case "object":
      return "{ " + v.entries.map((e) => `${e.key}: ${renderLiteral(e.value)}`).join(", ") + " }";
  }
}
function parseExistingRoutes(existingText, exportName, warn) {
  const anchor = new RegExp(`export\\s+const\\s+${exportName}\\s*:\\s*[\\w.$<>]+\\[\\]\\s*=`).exec(existingText);
  if (anchor === null) return [];
  const arrStart = existingText.indexOf("[", anchor.index + anchor[0].length - 1);
  if (arrStart < 0) return [];
  let depth = 0;
  let arrEnd = -1;
  for (let i = arrStart; i < existingText.length; i++) {
    const c = existingText[i];
    if (c === "[") depth++;
    if (c === "]") {
      depth--;
      if (depth === 0) {
        arrEnd = i;
        break;
      }
    }
  }
  if (arrEnd < 0) return [];
  try {
    const parsed = parseUtsArrayLiteral(existingText.slice(arrStart, arrEnd + 1));
    if (parsed.kind !== "array") return [];
    const out = [];
    for (const item of parsed.items) {
      if (item.kind !== "object") continue;
      const pathEntry = item.entries.find((e) => e.key === "path");
      if (pathEntry === void 0 || pathEntry.value.kind !== "string") continue;
      out.push({ path: pathEntry.value.value, entries: item.entries });
    }
    return out;
  } catch (e) {
    const msg = e instanceof LiteralParseError ? e.message : String(e);
    warn(`\u65E2\u6709\u8DEF\u7531\u6587\u4EF6\u89E3\u6790\u5931\u8D25\uFF0C\u672C\u6B21\u8DF3\u8FC7 preserveRouteChanges\uFF1A${msg}`);
    return [];
  }
}
function renderPagesJson(drafts, options, warn) {
  let preserved = {};
  try {
    if (fs3.existsSync(options.pagesJsonPath.abs)) {
      const raw = fs3.readFileSync(options.pagesJsonPath.abs, "utf8");
      const parsed = JSON.parse(raw);
      preserved = parsed;
      delete preserved.pages;
      delete preserved.tabBar;
      delete preserved.subPackages;
      delete preserved.subpackages;
    }
  } catch (e) {
    warn(`\u65E2\u6709 pages.json \u89E3\u6790\u5931\u8D25\uFF0C\u624B\u5199\u5B57\u6BB5\u5C06\u4E22\u5931\uFF1A${String(e)}`);
  }
  const styleFor = (d) => d.title !== null ? { navigationBarTitleText: d.title } : void 0;
  const mainPages = drafts.filter((d) => d.pkgRoot === null).map((d) => {
    const style = styleFor(d);
    return style !== void 0 ? { path: d.path, style } : { path: d.path };
  });
  const out = { pages: mainPages };
  const subRoots = [...new Set(drafts.filter((d) => d.pkgRoot !== null).map((d) => d.pkgRoot))];
  if (subRoots.length > 0) {
    out.subPackages = subRoots.map((root) => ({
      root,
      pages: drafts.filter((d) => d.pkgRoot === root).map((d) => {
        const style = styleFor(d);
        return style !== void 0 ? { path: d.rel, style } : { path: d.rel };
      })
    }));
  }
  const tabPages = drafts.filter((d) => d.isTab && d.pkgRoot === null).map((d, i) => ({ d, i })).sort((a, b) => (a.d.order ?? Number.MAX_SAFE_INTEGER) - (b.d.order ?? Number.MAX_SAFE_INTEGER) || a.i - b.i).map((x) => x.d);
  if (tabPages.length > 0) {
    const chrome = {};
    if (options.pages.tabBar.color !== void 0) chrome.color = options.pages.tabBar.color;
    if (options.pages.tabBar.selectedColor !== void 0) chrome.selectedColor = options.pages.tabBar.selectedColor;
    if (options.pages.tabBar.backgroundColor !== void 0) chrome.backgroundColor = options.pages.tabBar.backgroundColor;
    if (options.pages.tabBar.borderStyle !== void 0) chrome.borderStyle = options.pages.tabBar.borderStyle;
    chrome.list = tabPages.map((d) => {
      const item = {
        pagePath: d.path,
        text: d.tabText ?? d.title ?? d.path.split("/").pop() ?? d.path
      };
      if (d.iconPath !== null) item.iconPath = d.iconPath;
      if (d.selectedIconPath !== null) item.selectedIconPath = d.selectedIconPath;
      return item;
    });
    out.tabBar = chrome;
  }
  for (const key of Object.keys(preserved)) out[key] = preserved[key];
  return JSON.stringify(out, null, "	") + "\n";
}
function renderRoutesGen(drafts, options, existingText, warn, declareHint) {
  const preserved = /* @__PURE__ */ new Map();
  if (existingText !== null && options.router.preserveRouteChanges) {
    for (const entry of parseExistingRoutes(existingText, options.router.exportName, warn)) {
      preserved.set(entry.path, entry.entries);
    }
  }
  const usedTypes = /* @__PURE__ */ new Set(["RouteConfig"]);
  const lines = [];
  for (const d of drafts) {
    const prev = preserved.get(d.path);
    const prevMap = new Map((prev ?? []).map((e) => [e.key, e.value]));
    const metaEntries = [];
    const generatedMetaKeys = /* @__PURE__ */ new Set();
    if (d.title !== null) {
      metaEntries.push({ key: "title", value: { kind: "string", value: d.title } });
      generatedMetaKeys.add("title");
    }
    if (d.isTab) {
      metaEntries.push({ key: "isTab", value: { kind: "boolean", value: true } });
      generatedMetaKeys.add("isTab");
    }
    for (const extra of d.metaExtra) {
      metaEntries.push(extra);
      generatedMetaKeys.add(extra.key);
    }
    const prevMeta = prevMap.get("meta");
    if (prevMeta !== void 0 && prevMeta.kind === "object") {
      for (const e of prevMeta.entries) {
        if (!generatedMetaKeys.has(e.key)) metaEntries.push(e);
      }
    }
    if (metaEntries.length > 0) usedTypes.add("RouteMeta");
    const fields = [];
    fields.push(`path: ${quote(d.path)}`);
    fields.push(`name: ${quote(d.name)}`);
    const prevRedirect = prevMap.get("redirect");
    if (d.redirect !== null) fields.push(`redirect: ${quote(d.redirect)}`);
    else if (prevRedirect !== void 0) fields.push(`redirect: ${renderLiteral(prevRedirect)}`);
    if (metaEntries.length > 0) fields.push(`meta: { ${metaEntries.map((e) => `${e.key}: ${renderLiteral(e.value)}`).join(", ")} }`);
    const prevBeforeEnter = prevMap.get("beforeEnter");
    if (d.beforeEnter !== null) fields.push(`beforeEnter: ${reindent(d.beforeEnter, "		")}`);
    else if (prevBeforeEnter !== void 0 && prevBeforeEnter.kind === "raw") fields.push(`beforeEnter: ${reindent(dedentField(prevBeforeEnter.value, "		"), "		")}`);
    for (const [key, value] of prevMap) {
      if (["path", "name", "redirect", "meta", "beforeEnter"].includes(key)) continue;
      fields.push(`${key}: ${renderLiteral(value)}`);
    }
    lines.push("	{");
    lines.push(fields.map((f) => "		" + f).join(",\n") + (fields.length > 0 ? "," : ""));
    lines.push("	},");
  }
  const importLine = usedTypes.size > 1 ? `import type { ${[...usedTypes].join(", ")} } from '${options.router.importFrom}'` : `import type { RouteConfig } from '${options.router.importFrom}'`;
  const header = ["/**", " * \u672C\u6587\u4EF6\u7531 @meng-xi/unix-router/vite-plugin \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u6574\u4F53\u624B\u6539\u3002", " * preserveRouteChanges \u5DF2\u5F00\u542F\uFF1A\u91CD\u65B0\u751F\u6210\u65F6\u4FDD\u7559\u4F60\u8FFD\u52A0\u7684\u81EA\u5B9A\u4E49\u5B57\u6BB5\u4E0E\u6574\u6761\u81EA\u5B9A\u4E49\u8DEF\u7531\uFF1B", declareHint, " */"];
  return [...header, importLine, "", `export const ${options.router.exportName}: RouteConfig[] = [`].join("\n") + "\n" + lines.join("\n") + "\n]\n";
}
function reindent(raw, indent) {
  const lines = raw.split("\n");
  if (lines.length === 1) return raw;
  return lines.map((l, i) => i === 0 || l.trim() === "" ? l : indent + l).join("\n");
}
function dedentField(raw, indent) {
  const lines = raw.split("\n");
  if (lines.length === 1) return raw;
  return lines.map((l, i) => i === 0 || l.trim() === "" ? l : l.startsWith(indent) ? l.slice(indent.length) : l).join("\n");
}
function renderRouteNameDts(drafts, options) {
  const lines = [
    "/**",
    " * RouteNameMap \u5B57\u9762\u91CF\u7C7B\u578B\u589E\u5F3A\uFF08\u7531 @meng-xi/unix-router/vite-plugin \u751F\u6210\uFF09",
    " * \u4F9B WEB \u7AEF RouteName \u7C7B\u578B\u63A8\u5BFC\uFF1B\u539F\u751F\u7AEF UTS \u4E0D\u652F\u6301 keyof \u7EC4\u5408\uFF0C\u4ECD\u4E3A string\u3002",
    " */",
    `import '${options.router.importFrom}'`,
    "",
    `declare module '${options.router.importFrom}' {`,
    "	interface RouteNameMap {"
  ];
  for (const d of drafts) {
    const title = d.title !== null ? d.title : d.path;
    lines.push(`		/** ${title} */`);
    const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(d.name) ? d.name : quote(d.name);
    lines.push(`		${key}: ${quote(d.path)}`);
  }
  lines.push("	}", "}", "");
  return lines.join("\n");
}
function renderMacroDts() {
  return [
    "/**",
    " * defineUniPage \u9875\u9762\u914D\u7F6E\u5B8F\u7C7B\u578B\u58F0\u660E\uFF08\u7531 @meng-xi/unix-router/vite-plugin \u751F\u6210\uFF09",
    " * \u5B8F\u5728\u7F16\u8BD1\u671F\u88AB\u5265\u79BB\uFF0C\u8FD0\u884C\u65F6\u4E0D\u5360\u7528\u4F53\u79EF\u3002",
    " */",
    "declare function defineUniPage(config: {",
    "	/** \u9875\u9762\u6807\u9898\uFF1A\u540C\u6B65\u5230 pages.json \u7684 navigationBarTitleText \u4E0E\u8DEF\u7531 meta.title */",
    "	title?: string",
    "	/** \u8DEF\u7531\u540D\uFF08\u7F3A\u7701\u6309 camelCase \u89C4\u8303\u5316\u751F\u6210\uFF09 */",
    "	name?: string",
    "	/** \u662F\u5426 tabBar \u9875\u9762 */",
    "	isTab?: boolean",
    "	/** tabBar \u9644\u5C5E\u4FE1\u606F */",
    "	tab?: { order?: number; iconPath?: string; selectedIconPath?: string; text?: string }",
    "	/** \u8DEF\u7531 meta \u6269\u5C55\u5B57\u6BB5\uFF08\u9700\u4E0E RouteMeta \u5B9A\u4E49\u5339\u914D\uFF09 */",
    "	meta?: Record<string, any>",
    "	/** \u8DEF\u7531\u91CD\u5B9A\u5411\u76EE\u6807\uFF08\u9875\u9762\u8DEF\u5F84\uFF09 */",
    "	redirect?: string",
    "	/** \u8DEF\u7531\u72EC\u4EAB\u524D\u7F6E\u5B88\u536B\uFF08\u987B\u81EA\u5305\u542B\uFF0C\u751F\u6210\u6587\u4EF6\u5185\u4E0D\u5F15\u7528\u9875\u9762\u4F5C\u7528\u57DF\uFF09 */",
    "	beforeEnter?: (to: any, from: any) => any",
    "}): void",
    "",
    "export {}",
    ""
  ].join("\n");
}

// node/shared/common/options.ts
import path2 from "path";
var toFileRef = (root, rel) => ({ rel, abs: path2.resolve(root, rel) });
function resolveCommon(raw, root) {
  return {
    root,
    pagesJsonPath: toFileRef(root, raw.pagesJsonPath ?? "pages.json"),
    watch: raw.watch ?? true,
    enabled: raw.enabled ?? true,
    verbose: raw.verbose ?? false,
    errorStrategy: raw.errorStrategy ?? "strict"
  };
}
function resolvePagesSection(pages, root) {
  const p = pages ?? {};
  const pagesDts = typeof p.dts === "string" ? toFileRef(root, p.dts) : null;
  return {
    pagesDir: toFileRef(root, p.pagesDir ?? "pages"),
    subPackages: (p.subPackages ?? []).map((s) => ({ root: s.root, dir: toFileRef(root, s.dir) })),
    entryPage: p.entryPage ?? null,
    titleFallback: p.titleFallback ?? null,
    tabBar: p.tabBar ?? {},
    includeExtensions: p.includeExtensions ?? [".uvue"],
    excludePatterns: p.excludePatterns ?? [],
    dts: pagesDts
  };
}
function resolveRouterSection(router, root) {
  const r = router ?? {};
  const routerDts = typeof r.dts === "string" ? toFileRef(root, r.dts) : r.dts === true ? toFileRef(root, "route-name.gen.d.ts") : null;
  return {
    outputPath: toFileRef(root, r.outputPath ?? "routes.gen.uts"),
    exportName: r.exportName ?? "routes",
    nameStrategy: r.nameStrategy ?? "camelCase",
    importFrom: r.importFrom ?? "@meng-xi/unix-router",
    dts: routerDts,
    preserveRouteChanges: r.preserveRouteChanges ?? true,
    extensionsFile: null
  };
}
function resolveOptions(raw, root = process.cwd()) {
  return {
    ...resolveCommon(raw, root),
    pages: resolvePagesSection(raw.pages, root),
    router: resolveRouterSection(raw.router, root)
  };
}
function resolvePagesGenOptions(raw, root = process.cwd()) {
  return {
    ...resolveCommon(raw, root),
    pages: resolvePagesSection(raw.pages, root)
  };
}
function resolveRoutesGenOptions(raw, root = process.cwd()) {
  const router = raw.router ?? {};
  return {
    ...resolveCommon(raw, root),
    router: {
      ...resolveRouterSection(router, root),
      extensionsFile: router.extensions === false ? null : toFileRef(root, router.extensions ?? "routes.ext.uts")
    }
  };
}

// node/shared/scanning/scan.ts
import fs4 from "fs";
import path3 from "path";
var isExcluded = (relPath, patterns) => patterns.some((p) => typeof p === "string" ? relPath.includes(p) : p.test(relPath));
function walk(dirAbs, relBase, options, out) {
  if (!fs4.existsSync(dirAbs)) return;
  const items = fs4.readdirSync(dirAbs, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const item of items) {
    const abs = path3.join(dirAbs, item.name);
    if (item.isDirectory()) {
      if (item.name === "node_modules" || item.name === "unpackage" || item.name === ".git") continue;
      const rel = relBase + item.name + "/";
      if (isExcluded(rel, options.pages.excludePatterns)) continue;
      walk(abs, rel, options, out);
      continue;
    }
    if (!item.isFile()) continue;
    const ext = path3.extname(item.name);
    if (!options.pages.includeExtensions.includes(ext)) continue;
    const relWithExt = relBase + item.name;
    if (isExcluded(relWithExt, options.pages.excludePatterns)) continue;
    out.push(relWithExt);
  }
}
function scanPages(options) {
  const warnings = [];
  const errors = [];
  const pages = [];
  const mainBase = path3.dirname(options.pages.pagesDir.abs);
  const mainRels = [];
  walk(options.pages.pagesDir.abs, "", options, mainRels);
  for (const relWithExt of mainRels) {
    const file = path3.join(options.pages.pagesDir.abs, relWithExt);
    const ext = path3.extname(relWithExt);
    const rel = relWithExt.slice(0, relWithExt.length - ext.length);
    const pathWithExt = toPosix(path3.relative(mainBase, file));
    pages.push({
      path: pathWithExt.slice(0, pathWithExt.length - ext.length),
      rel,
      file,
      pkgRoot: null,
      spec: null,
      macro: null,
      block: null
    });
  }
  for (const sub of options.pages.subPackages) {
    const subRels = [];
    walk(sub.dir.abs, "", options, subRels);
    for (const relWithExt of subRels) {
      const ext = path3.extname(relWithExt);
      const rel = relWithExt.slice(0, relWithExt.length - ext.length);
      pages.push({
        path: toPosix(sub.root + "/" + rel),
        rel,
        file: path3.join(sub.dir.abs, relWithExt),
        pkgRoot: sub.root,
        spec: null,
        macro: null,
        block: null
      });
    }
  }
  for (const page of pages) {
    let content;
    try {
      content = fs4.readFileSync(page.file, "utf8");
    } catch (e) {
      errors.push(`\u8BFB\u53D6\u9875\u9762\u5931\u8D25 ${page.file}: ${String(e)}`);
      continue;
    }
    const macro = stripDefineUniPage(content);
    const block = extractRouteConfigBlock(content);
    if (macro.error !== null) errors.push(`${path3.basename(page.file)}: ${macro.error}`);
    if (block.error !== null) errors.push(`${path3.basename(page.file)}: ${block.error}`);
    if (macro.spec !== null && macro.spec.unknownFields.length > 0) {
      warnings.push(`${path3.basename(page.file)}: defineUniPage \u5B58\u5728\u672A\u8BC6\u522B\u5B57\u6BB5 ${macro.spec.unknownFields.join(", ")}\uFF08\u5DF2\u5FFD\u7565\uFF09`);
    }
    if (block.spec !== null && block.spec.unknownFields.length > 0) {
      warnings.push(`${path3.basename(page.file)}: <route-config> \u5B58\u5728\u672A\u8BC6\u522B\u5B57\u6BB5 ${block.spec.unknownFields.join(", ")}\uFF08\u5DF2\u5FFD\u7565\uFF09`);
    }
    page.macro = macro.spec;
    page.block = block.spec;
    page.spec = mergeSpecs(macro.spec, block.spec);
  }
  pages.sort((a, b) => a.path.localeCompare(b.path));
  return { pages, warnings, errors };
}
var toPosix = (p) => p.split(path3.sep).join("/");

// node/shared/common/utils.ts
import fs5 from "fs";
function writeFileIfChanged(abs, content) {
  try {
    if (fs5.readFileSync(abs, "utf8") === content) return false;
  } catch {
  }
  fs5.writeFileSync(abs, content, "utf8");
  return true;
}
function readIfExists(abs) {
  try {
    return fs5.readFileSync(abs, "utf8");
  } catch {
    return null;
  }
}
function createSerialDebounced(run, onError) {
  let running = false;
  let pending = false;
  const schedule = (reason) => {
    if (running) {
      pending = true;
      return;
    }
    running = true;
    setTimeout(() => {
      try {
        run(reason);
      } catch (e) {
        onError(e);
      }
      running = false;
      if (pending) {
        pending = false;
        schedule(reason);
      }
    }, 200);
  };
  return schedule;
}

// node/route-gen/index.ts
var routeGenUnplugin = createUnplugin((raw = {}) => {
  let options = resolveOptions(raw);
  const log = (...args) => {
    if (options.verbose) console.log(LOG_PREFIX, ...args);
  };
  const warn = (...args) => {
    console.warn(LOG_PREFIX, ...args);
  };
  const fail = (msg) => {
    if (options.errorStrategy === "warn") {
      warn(msg);
      return;
    }
    throw new Error(`${LOG_PREFIX} ${msg}`);
  };
  function regenerate(reason) {
    if (!options.enabled) return;
    const scan = scanPages(options);
    scan.warnings.forEach((w) => warn(w));
    if (scan.errors.length > 0) {
      fail(`\u9875\u9762\u58F0\u660E\u89E3\u6790\u5931\u8D25\uFF1A
${scan.errors.map((e) => `  - ${e}`).join("\n")}`);
    }
    const drafts = buildDrafts(scan, options);
    buildNames(drafts, { pagesDirName: options.pages.pagesDir.rel.split("/").pop() ?? "pages", nameStrategy: options.router.nameStrategy }, fail);
    const changedPagesJson = writeFileIfChanged(
      options.pagesJsonPath.abs,
      renderPagesJson(drafts, options, (msg) => warn(msg))
    );
    const routesContent = renderRoutesGen(drafts, options, readIfExists(options.router.outputPath.abs), (msg) => warn(msg), " * \u9875\u9762\u7EA7\u58F0\u660E\u8BF7\u4F7F\u7528\u9875\u9762\u5185\u7684 defineUniPage \u5B8F\u6216 <route-config> \u5757\u3002");
    const changedRoutes = writeFileIfChanged(options.router.outputPath.abs, routesContent);
    let changedDts = false;
    if (options.pages.dts !== null) {
      changedDts = writeFileIfChanged(options.pages.dts.abs, renderMacroDts()) || changedDts;
    }
    if (options.router.dts !== null) {
      changedDts = writeFileIfChanged(options.router.dts.abs, renderRouteNameDts(drafts, options)) || changedDts;
    }
    const outputs = [changedPagesJson ? options.pagesJsonPath.rel : null, changedRoutes ? options.router.outputPath.rel : null, changedDts ? "dts" : null].filter((v) => v !== null);
    log(`regenerated(${reason}): ${scan.pages.length} pages\uFF08tab ${drafts.filter((d) => d.isTab).length}/\u5206\u5305 ${scan.pages.filter((p) => p.pkgRoot !== null).length}\uFF09\u2192 ${outputs.length > 0 ? outputs.join(" / ") : "\u65E0\u53D8\u5316"}`);
  }
  const scheduleRegenerate = createSerialDebounced(regenerate, (e) => console.error(LOG_PREFIX, e));
  const isGeneratedOutput = (file) => file === options.pagesJsonPath.abs || file === options.router.outputPath.abs || file === options.router.dts?.abs || file === options.pages.dts?.abs;
  const isWatchedPath = (file) => {
    const watched = [options.pages.pagesDir.abs, ...options.pages.subPackages.map((s) => s.dir.abs)];
    return watched.some((dir) => file.startsWith(dir + "\\") || file.startsWith(dir + "/"));
  };
  return {
    name: PLUGIN_NAME,
    /** 路由生成插件监听构建开始时触发 */
    buildStart() {
      regenerate("buildStart");
    },
    /** 路由生成插件监听文件变更时触发 */
    watchChange(id, change) {
      if (!options.watch || isGeneratedOutput(id) || !isWatchedPath(id)) return;
      scheduleRegenerate(`watch ${change.event}: ${id}`);
    },
    /** 路由生成插件监听模块请求时触发 */
    resolveId(id) {
      if (isRouteConfigBlockRequest(id)) return BLOCK_VIRTUAL_PREFIX + id;
      return null;
    },
    /** 路由生成插件监听模块加载时触发 */
    load(id) {
      if (id.startsWith(BLOCK_VIRTUAL_PREFIX)) return "";
      return null;
    },
    /** 路由生成插件监听模块转换时触发 */
    transform(code, id) {
      const cleanId = id.split("?")[0];
      if (!/\.(uvue|vue)$/.test(cleanId)) return null;
      if (!/\bdefineUniPage\s*\(/.test(code)) return null;
      const result = stripDefineUniPage(code);
      if (result.error !== null) fail(result.error);
      return result.code !== code ? { code: result.code, map: null } : null;
    },
    /** 路由生成插件监听 Vite 配置解析时触发 */
    vite: {
      enforce: "pre",
      /** 路由生成插件监听 Vite 配置解析时触发 */
      configResolved(config) {
        if (config.root !== options.root) options = resolveOptions(raw, config.root);
      },
      /** 路由生成插件监听 Vite 服务器配置时触发 */
      configureServer(server) {
        if (!options.watch) return;
        const onEvent = (file) => {
          if (isGeneratedOutput(file) || !isWatchedPath(file)) return;
          scheduleRegenerate(`hmr: ${file}`);
        };
        server.watcher.on("add", onEvent);
        server.watcher.on("change", onEvent);
        server.watcher.on("unlink", onEvent);
      }
    }
  };
});
var routeGen = routeGenUnplugin.vite;
var route_gen_default = routeGenUnplugin;

// node/pages-gen/index.ts
var pagesGenUnplugin = createUnplugin((raw = {}) => {
  let options = resolvePagesGenOptions(raw);
  const log = (...args) => {
    if (options.verbose) console.log(PAGES_GEN_LOG_PREFIX, ...args);
  };
  const warn = (...args) => {
    console.warn(PAGES_GEN_LOG_PREFIX, ...args);
  };
  const fail = (msg) => {
    if (options.errorStrategy === "warn") {
      warn(msg);
      return;
    }
    throw new Error(`${PAGES_GEN_LOG_PREFIX} ${msg}`);
  };
  function regenerate(reason) {
    if (!options.enabled) return;
    const scan = scanPages(options);
    scan.warnings.forEach((w) => warn(w));
    if (scan.errors.length > 0) {
      fail(`\u9875\u9762\u58F0\u660E\u89E3\u6790\u5931\u8D25\uFF1A
${scan.errors.map((e) => `  - ${e}`).join("\n")}`);
    }
    const drafts = buildDrafts(scan, options);
    const changedPagesJson = writeFileIfChanged(
      options.pagesJsonPath.abs,
      renderPagesJson(drafts, options, (msg) => warn(msg))
    );
    let changedDts = false;
    if (options.pages.dts !== null) {
      changedDts = writeFileIfChanged(options.pages.dts.abs, renderMacroDts());
    }
    const outputs = [changedPagesJson ? options.pagesJsonPath.rel : null, changedDts ? "dts" : null].filter((v) => v !== null);
    log(`regenerated(${reason}): ${scan.pages.length} pages\uFF08tab ${drafts.filter((d) => d.isTab).length}/\u5206\u5305 ${scan.pages.filter((p) => p.pkgRoot !== null).length}\uFF09\u2192 ${outputs.length > 0 ? outputs.join(" / ") : "\u65E0\u53D8\u5316"}`);
  }
  const scheduleRegenerate = createSerialDebounced(regenerate, (e) => console.error(PAGES_GEN_LOG_PREFIX, e));
  const isGeneratedOutput = (file) => file === options.pagesJsonPath.abs || file === options.pages.dts?.abs;
  const isWatchedPath = (file) => {
    const watched = [options.pages.pagesDir.abs, ...options.pages.subPackages.map((s) => s.dir.abs)];
    return watched.some((dir) => file.startsWith(dir + "\\") || file.startsWith(dir + "/"));
  };
  return {
    name: PAGES_GEN_PLUGIN_NAME,
    /** 页面生成插件构建开始时触发 */
    buildStart() {
      regenerate("buildStart");
    },
    /** 页面生成插件监听 Vite 服务器文件变更时触发 */
    watchChange(id, change) {
      if (!options.watch || isGeneratedOutput(id) || !isWatchedPath(id)) return;
      scheduleRegenerate(`watch ${change.event}: ${id}`);
    },
    /** 页面生成插件解析模块 ID时触发 */
    resolveId(id) {
      if (isRouteConfigBlockRequest(id)) return BLOCK_VIRTUAL_PREFIX + id;
      return null;
    },
    /** 页面生成插件加载模块时触发 */
    load(id) {
      if (id.startsWith(BLOCK_VIRTUAL_PREFIX)) return "";
      return null;
    },
    /** 页面生成插件转换模块时触发 */
    transform(code, id) {
      const cleanId = id.split("?")[0];
      if (!/\.(uvue|vue)$/.test(cleanId)) return null;
      if (!/\bdefineUniPage\s*\(/.test(code)) return null;
      const result = stripDefineUniPage(code);
      if (result.error !== null) fail(result.error);
      return result.code !== code ? { code: result.code, map: null } : null;
    },
    /** 页面生成插件 Vite 配置 */
    vite: {
      enforce: "pre",
      /** 页面生成插件 Vite 配置 */
      configResolved(config) {
        if (config.root !== options.root) options = resolvePagesGenOptions(raw, config.root);
      },
      /** 页面生成插件 Vite 配置 */
      configureServer(server) {
        if (!options.watch) return;
        const onEvent = (file) => {
          if (isGeneratedOutput(file) || !isWatchedPath(file)) return;
          scheduleRegenerate(`hmr: ${file}`);
        };
        server.watcher.on("add", onEvent);
        server.watcher.on("change", onEvent);
        server.watcher.on("unlink", onEvent);
      }
    }
  };
});
var pagesGen = pagesGenUnplugin.vite;

// node/routes-gen/ext.ts
function parseExtDeclarations(text) {
  const warnings = [];
  const anchor = /export\s+(?:const|let)\s+[A-Za-z_$][\w$]*\s*=/.exec(text);
  if (anchor === null) {
    return { entries: [], warnings, error: "\u672A\u627E\u5230 'export const xxx =' \u58F0\u660E\uFF0C\u6269\u5C55\u58F0\u660E\u6587\u4EF6\u987B\u5BFC\u51FA\u4E00\u4E2A\u6570\u7EC4\u5B57\u9762\u91CF" };
  }
  const arrStart = text.indexOf("[", anchor.index + anchor[0].length);
  if (arrStart < 0) {
    return { entries: [], warnings, error: "\u58F0\u660E\u53F3\u4FA7\u987B\u4E3A\u6570\u7EC4\u5B57\u9762\u91CF [ ... ]" };
  }
  let depth = 0;
  let arrEnd = -1;
  for (let i = arrStart; i < text.length; i++) {
    const c = text[i];
    if (c === "[") depth++;
    if (c === "]") {
      depth--;
      if (depth === 0) {
        arrEnd = i;
        break;
      }
    }
  }
  if (arrEnd < 0) return { entries: [], warnings, error: "\u6570\u7EC4\u5B57\u9762\u91CF\u672A\u95ED\u5408" };
  let parsed;
  try {
    parsed = parseUtsArrayLiteral(text.slice(arrStart, arrEnd + 1));
  } catch (e) {
    const msg = e instanceof LiteralParseError ? e.message : String(e);
    return { entries: [], warnings, error: `\u6269\u5C55\u58F0\u660E\u6570\u7EC4\u89E3\u6790\u5931\u8D25\uFF1A${msg}` };
  }
  if (parsed.kind !== "array") return { entries: [], warnings, error: "\u58F0\u660E\u53F3\u4FA7\u987B\u4E3A\u6570\u7EC4\u5B57\u9762\u91CF [ ... ]" };
  const entries = [];
  for (const item of parsed.items) {
    if (item.kind !== "object") {
      warnings.push("\u6269\u5C55\u58F0\u660E\u6570\u7EC4\u4E2D\u5B58\u5728\u975E\u5BF9\u8C61\u6761\u76EE\uFF0C\u5DF2\u5FFD\u7565");
      continue;
    }
    const entry = extFromEntries(item.entries);
    if (entry.error !== null) {
      warnings.push(entry.error);
      continue;
    }
    entries.push(entry.entry);
  }
  return { entries, warnings, error: null };
}
function extFromEntries(entries) {
  const ext = { path: null, name: null, metaExtra: [], beforeEnter: null, unknownFields: [] };
  for (const { key, value } of entries) {
    switch (key) {
      case "path":
        if (value.kind === "string") ext.path = value.value;
        break;
      case "name":
        if (value.kind === "string") ext.name = value.value;
        break;
      case "meta":
        if (value.kind === "object") ext.metaExtra = [...value.entries];
        break;
      case "beforeEnter":
        if (value.kind === "raw") ext.beforeEnter = value.value;
        break;
      default:
        ext.unknownFields.push(key);
    }
  }
  if (ext.path === null && ext.name === null) {
    return { entry: ext, error: "\u6269\u5C55\u58F0\u660E\u6761\u76EE\u7F3A\u5C11\u5339\u914D\u952E\uFF1A\u987B\u58F0\u660E path \u6216 name \u4E4B\u4E00" };
  }
  if (ext.unknownFields.length > 0) {
    return { entry: ext, error: `\u6269\u5C55\u58F0\u660E\u6761\u76EE\u5B58\u5728\u672A\u652F\u6301\u5B57\u6BB5 ${ext.unknownFields.join(", ")}\uFF08\u53EF\u7528\uFF1Apath / name / meta / beforeEnter\uFF09` };
  }
  return { entry: ext, error: null };
}
function mergeExtIntoDrafts(drafts, exts, warn) {
  for (const ext of exts) {
    const draft = ext.path !== null ? drafts.find((d) => d.path === ext.path) : drafts.find((d) => d.name === ext.name);
    const keyDesc = ext.path !== null ? `path: '${ext.path}'` : `name: '${ext.name}'`;
    if (draft === void 0) {
      warn(`\u6269\u5C55\u58F0\u660E\u672A\u5339\u914D\u5230\u8DEF\u7531\uFF08${keyDesc}\uFF09\uFF0C\u5DF2\u5FFD\u7565`);
      continue;
    }
    if (ext.name !== null && ext.name !== draft.name) {
      if (drafts.some((d) => d !== draft && d.name === ext.name)) {
        warn(`\u6269\u5C55\u58F0\u660E name '${ext.name}'\uFF08${keyDesc}\uFF09\u4E0E\u5176\u4ED6\u8DEF\u7531\u51B2\u7A81\uFF0C\u5DF2\u5FFD\u7565\u6539\u540D`);
      } else {
        draft.name = ext.name;
      }
    }
    for (const e of ext.metaExtra) {
      if (e.key === "title" && draft.title !== null) {
        warn(`\u8DEF\u7531 '${draft.path}' \u7684 meta.title \u5DF2\u7531 pages.json style \u63A8\u5BFC\uFF0C\u6269\u5C55\u58F0\u660E\u88AB\u5FFD\u7565`);
        continue;
      }
      if (e.key === "isTab" && draft.isTab) {
        warn(`\u8DEF\u7531 '${draft.path}' \u7684 meta.isTab \u5DF2\u7531 pages.json tabBar \u63A8\u5BFC\uFF0C\u6269\u5C55\u58F0\u660E\u88AB\u5FFD\u7565`);
        continue;
      }
      draft.metaExtra = draft.metaExtra.filter((x) => x.key !== e.key);
      draft.metaExtra.push(e);
    }
    if (ext.beforeEnter !== null) {
      if (draft.beforeEnter !== null) warn(`\u8DEF\u7531 '${draft.path}' \u7684 beforeEnter \u88AB\u6269\u5C55\u58F0\u660E\u8986\u76D6`);
      draft.beforeEnter = ext.beforeEnter;
    }
  }
}

// node/routes-gen/index.ts
function buildDraftsFromPagesJson(data, warn) {
  const root = typeof data === "object" && data !== null ? data : {};
  const emptyDraft = (path4, rel, pkgRoot) => ({
    path: path4,
    rel,
    pkgRoot,
    title: null,
    isTab: false,
    order: null,
    iconPath: null,
    selectedIconPath: null,
    tabText: null,
    name: "",
    metaExtra: [],
    beforeEnter: null,
    redirect: null
  });
  const tabPaths = /* @__PURE__ */ new Set();
  const tabBar = typeof root.tabBar === "object" && root.tabBar !== null ? root.tabBar : null;
  if (tabBar !== null && Array.isArray(tabBar.list)) {
    for (const item of tabBar.list) {
      if (typeof item === "object" && item !== null && typeof item.pagePath === "string") {
        tabPaths.add(item.pagePath);
      }
    }
  }
  const titleOf = (page) => {
    const style = typeof page.style === "object" && page.style !== null ? page.style : null;
    const title = style !== null ? style.navigationBarTitleText : null;
    return typeof title === "string" ? title : null;
  };
  const drafts = [];
  let entryPath = null;
  if (Array.isArray(root.pages)) {
    for (const page of root.pages) {
      if (typeof page !== "object" || page === null) continue;
      const p = page;
      if (typeof p.path !== "string" || p.path === "") {
        warn("pages.json pages \u6570\u7EC4\u4E2D\u5B58\u5728\u7F3A\u5C11 path \u7684\u6761\u76EE\uFF0C\u5DF2\u5FFD\u7565");
        continue;
      }
      if (entryPath === null) entryPath = p.path;
      const draft = emptyDraft(p.path, p.path, null);
      draft.title = titleOf(p);
      draft.isTab = tabPaths.has(p.path);
      drafts.push(draft);
    }
  } else {
    warn("pages.json \u7F3A\u5C11 pages \u6570\u7EC4\uFF0C\u672A\u63A8\u5BFC\u51FA\u4EFB\u4F55\u8DEF\u7531");
  }
  const subs = Array.isArray(root.subPackages) ? root.subPackages : Array.isArray(root.subpackages) ? root.subpackages : [];
  for (const sub of subs) {
    if (typeof sub !== "object" || sub === null) continue;
    const s = sub;
    if (typeof s.root !== "string" || s.root === "" || !Array.isArray(s.pages)) continue;
    const pkgRoot = s.root.replace(/\/$/, "");
    for (const page of s.pages) {
      if (typeof page !== "object" || page === null) continue;
      const p = page;
      if (typeof p.path !== "string" || p.path === "") continue;
      const draft = emptyDraft(pkgRoot + "/" + p.path, p.path, pkgRoot);
      draft.title = titleOf(p);
      draft.isTab = tabPaths.has(draft.path);
      drafts.push(draft);
    }
  }
  return { drafts, entryPath };
}
var routesGenUnplugin = createUnplugin((raw = {}) => {
  let options = resolveRoutesGenOptions(raw);
  const log = (...args) => {
    if (options.verbose) console.log(ROUTES_GEN_LOG_PREFIX, ...args);
  };
  const warn = (...args) => {
    console.warn(ROUTES_GEN_LOG_PREFIX, ...args);
  };
  const fail = (msg) => {
    if (options.errorStrategy === "warn") {
      warn(msg);
      return;
    }
    throw new Error(`${ROUTES_GEN_LOG_PREFIX} ${msg}`);
  };
  function regenerate(reason) {
    if (!options.enabled) return;
    const pagesJsonText = readIfExists(options.pagesJsonPath.abs);
    if (pagesJsonText === null) {
      fail(`\u672A\u627E\u5230 ${options.pagesJsonPath.rel}\uFF08routesGen \u4EE5 pages.json \u4E3A\u6570\u636E\u6E90\uFF0C\u9875\u9762\u751F\u6210\u8BF7\u6539\u7528 routeGen / pagesGen\uFF09`);
      return;
    }
    let pagesJsonData;
    try {
      pagesJsonData = parseJsonc(pagesJsonText);
    } catch (e) {
      fail(`pages.json \u89E3\u6790\u5931\u8D25\uFF1A${String(e)}`);
      return;
    }
    const { drafts, entryPath } = buildDraftsFromPagesJson(pagesJsonData, (msg) => warn(msg));
    drafts.sort((a, b) => a.path.localeCompare(b.path));
    if (entryPath !== null) {
      const idx = drafts.findIndex((d) => d.path === entryPath);
      if (idx >= 0) {
        const [d] = drafts.splice(idx, 1);
        const firstMain2 = drafts.findIndex((x) => x.pkgRoot === null);
        drafts.splice(firstMain2 < 0 ? 0 : firstMain2, 0, d);
      }
    }
    const existing = readIfExists(options.router.outputPath.abs);
    if (existing !== null && options.router.preserveRouteChanges) {
      for (const entry of parseExistingRoutes(existing, options.router.exportName, (msg) => warn(msg))) {
        const draft = drafts.find((d) => d.path === entry.path);
        if (draft === void 0 || draft.name !== "") continue;
        const nameEntry = entry.entries.find((e) => e.key === "name");
        if (nameEntry !== void 0 && nameEntry.value.kind === "string") draft.name = nameEntry.value.value;
      }
    }
    const firstMain = drafts.find((d) => d.pkgRoot === null);
    const pagesDirName = firstMain !== void 0 ? firstMain.path.split("/")[0] ?? "pages" : "pages";
    buildNames(drafts, { pagesDirName, nameStrategy: options.router.nameStrategy }, fail);
    if (options.router.extensionsFile !== null) {
      const extText = readIfExists(options.router.extensionsFile.abs);
      if (extText !== null) {
        const ext = parseExtDeclarations(extText);
        ext.warnings.forEach((w) => warn(w));
        if (ext.error !== null) {
          fail(`\u6269\u5C55\u58F0\u660E\u89E3\u6790\u5931\u8D25\uFF08${options.router.extensionsFile.rel}\uFF09\uFF1A${ext.error}`);
          return;
        }
        mergeExtIntoDrafts(drafts, ext.entries, (msg) => warn(msg));
      } else {
        log(`\u6269\u5C55\u58F0\u660E\u6587\u4EF6 ${options.router.extensionsFile.rel} \u4E0D\u5B58\u5728\uFF0C\u8DF3\u8FC7\u6269\u5C55\u5408\u5E76`);
      }
    }
    const routesContent = renderRoutesGen(drafts, options, existing, (msg) => warn(msg), " * \u6269\u5C55\u5B57\u6BB5\uFF08name / meta / beforeEnter\uFF09\u8BF7\u5728 routes.ext.uts \u6269\u5C55\u58F0\u660E\u6587\u4EF6\u4E2D\u914D\u7F6E\u3002");
    const changedRoutes = writeFileIfChanged(options.router.outputPath.abs, routesContent);
    let changedDts = false;
    if (options.router.dts !== null) {
      changedDts = writeFileIfChanged(options.router.dts.abs, renderRouteNameDts(drafts, options));
    }
    const outputs = [changedRoutes ? options.router.outputPath.rel : null, changedDts ? "dts" : null].filter((v) => v !== null);
    log(`regenerated(${reason}): ${drafts.length} routes\uFF08tab ${drafts.filter((d) => d.isTab).length}/\u5206\u5305 ${drafts.filter((d) => d.pkgRoot !== null).length}\uFF09\u2192 ${outputs.length > 0 ? outputs.join(" / ") : "\u65E0\u53D8\u5316"}`);
  }
  const scheduleRegenerate = createSerialDebounced(regenerate, (e) => console.error(ROUTES_GEN_LOG_PREFIX, e));
  const isGeneratedOutput = (file) => file === options.router.outputPath.abs || file === options.router.dts?.abs;
  const isWatchedPath = (file) => file === options.pagesJsonPath.abs || options.router.extensionsFile !== null && file === options.router.extensionsFile.abs;
  return {
    name: ROUTES_GEN_PLUGIN_NAME,
    /** 路由生成插件构建开始时触发 */
    buildStart() {
      regenerate("buildStart");
    },
    /** 路由生成插件监听文件变更时触发 */
    watchChange(id, change) {
      if (!options.watch || isGeneratedOutput(id) || !isWatchedPath(id)) return;
      scheduleRegenerate(`watch ${change.event}: ${id}`);
    },
    /** 路由生成插件监听 HMR 事件时触发 */
    vite: {
      /** 路由生成插件监听 HMR 事件时触发 */
      configResolved(config) {
        if (config.root !== options.root) options = resolveRoutesGenOptions(raw, config.root);
      },
      /** 路由生成插件监听 HMR 事件时触发 */
      configureServer(server) {
        if (!options.watch) return;
        const onEvent = (file) => {
          if (isGeneratedOutput(file) || !isWatchedPath(file)) return;
          scheduleRegenerate(`hmr: ${file}`);
        };
        server.watcher.on("add", onEvent);
        server.watcher.on("change", onEvent);
        server.watcher.on("unlink", onEvent);
      }
    }
  };
});
var routesGen = routesGenUnplugin.vite;
export {
  route_gen_default as default,
  pagesGen,
  pagesGenUnplugin,
  routeGen,
  routeGenUnplugin,
  routesGen,
  routesGenUnplugin
};
