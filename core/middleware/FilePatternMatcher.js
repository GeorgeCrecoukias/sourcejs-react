'use strict';
let minimatch = require('minimatch');
let hasMatch = Symbol();
let matchedPaths = Symbol();
let patterns = Symbol();
class FilePatternMatcher {
    /**
     * @param {{filePaths: Array.<String>, patterns: Array.<String>}} params
     */
    constructor({filePaths, patterns}) {
        this[matchedPaths] = filePaths.filter((file) => {
            var fileMatcher = new FilePathMatcher({file: file.replace(/\\/g, '/'), patterns});
            return fileMatcher.doesMatchAllPatterns();
        });
        this[hasMatch] = Boolean(this[matchedPaths].length);
        this[patterns] = patterns;
    }
    hasMatch() {
        return this[hasMatch];
    }
    matchedPaths() {
        return this[matchedPaths];
    }
}

class FilePathMatcher {
    /**
     * @param {{file: String, patterns: Array.<String>}} params
     */
    constructor(params) {
        this.file = params.file;
        this.patterns = params.patterns;
    }
    doesMatchAllPatterns() {
        let matchAllPatterns = true;
        this.patterns.forEach(pattern => {
            matchAllPatterns = minimatch.filter(pattern)(this.file) && matchAllPatterns;
        });
        return matchAllPatterns;
    }
}

module.exports = FilePatternMatcher;