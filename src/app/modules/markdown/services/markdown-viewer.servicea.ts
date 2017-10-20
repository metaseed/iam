
import * as MarkdownIt from 'markdown-it';
// const markdown = require('markdown-it');
import markdownVideoPlugin from 'markdown-it-video';
import { MarkdownConfig } from '../markdown.config';
import highlightjs from 'markdown-it-highlightjs';
import hljs from 'highlight.js';

import * as utils from '../../utils';

  private defaultConfig: MarkdownConfig = {
    markdownIt: {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: 'langPrefix-',
        linkify: true,
        typographer: false
    }
};
