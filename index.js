class Dictionary {
    #name
    #words

    constructor(name) {
        this.#name = name;
        this.#words = {};
    }

    get mainName() {
        return this.#name;
    }

    set mainName(value) {
        this.#name = value;
    }

    get allWords() {
        return this.#words;
    }

    #_addNewWord(wordKey, wordObj) {
        this.allWords[wordKey] = {word: wordKey, description: wordObj};
    }

    add(word, description) {
        if (!this.allWords[word])
            this.#_addNewWord(word, description);
    }

    remove(word) {
        delete this.allWords[word];
    }

    showAllWords() {
        return Object.values(this.allWords).forEach(i => console.log(`${i.word} - ${i.description}`));
    }
}

class HardWordsDictionary extends Dictionary {

    add(word, description) {
        super.add(word, description)
        this.#_addNewWord(word)
    }

    #_addNewWord(wordKey) {
        this.allWords[wordKey] = {...this.allWords[wordKey], isDifficult: true};
    }
}

const hardWordsDictionary = new HardWordsDictionary('Сложные слова');
hardWordsDictionary.add('дилетант', 'Тот, кто занимается наукой или искусством без специальной подготовки, обладая только поверхностными знаниями.');
hardWordsDictionary.add('неологизм', 'Новое слово или выражение, а также новое значение старого слова.');
hardWordsDictionary.add('квант', 'Неделимая часть какой-либо величины в физике.');
hardWordsDictionary.add('квант', 'Проверка на повторение.');
hardWordsDictionary.remove('неологизм');
hardWordsDictionary.showAllWords();
console.log(hardWordsDictionary.mainName); // Сложные слова
hardWordsDictionary.mainName = 'Новый Словарь';
console.log(hardWordsDictionary.mainName); // Новый Словарь
console.log(hardWordsDictionary.allWords); // выводит объект в котором есть слова дилетант и квант
