import {en} from "./en";
import {fa} from "./fa";

export const getTranslator = (language) => {
    switch (language) {
        case 'en':
            return en;
        case 'fa':
            return fa;
    }
};
