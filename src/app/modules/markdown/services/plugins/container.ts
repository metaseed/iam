import { Injectable } from '@angular/core';
import * as MarkdownIt from 'markdown-it';

@Injectable()
export class ContainerPlugin {
    constructor(markdown: MarkdownIt, )
    private DEFAULT_CONTAINER_FUNCTION = (name: string, cssClass: string, showHeading: boolean) => {
        const regex = new RegExp(`^${name}`);
        return {
            validate: function (params) {
                return params.trim().match(regex);
            },

            render: function (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                    return `<div class="${cssClass ? cssClass : name}"> ${showHeading ? '<b>' + name + '</b>' : ''}`;
                } else {
                    return '</div>';
                }
            }
        };
    }
}

