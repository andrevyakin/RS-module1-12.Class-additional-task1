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
        if (!Object.keys(this.allWords).some(key => key === word))
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

    /*add(word, description) {
         super.add(word, description)
        this.#_addNewWord(word, description)
    }*/

    // Как избавиться от дублирования кода?
    // Если вызывать метод родительского класса через super (см. выше),
    // то вызывается метод родительского класса #_addNewWord, а не дочернего. И в словарь не попадает isDifficult: true
    // Если после super.add(word, description) вызвать дочерний метод путем this.#_addNewWord(word, description)
    // то теряется вообще смысл вызова родительского метода add и не работает проверка на дублирование слов.
    // Можно сделать addNewWord публичным, тогда через super все заработает, будет вызываться метод _addNewWord дочернего класса,
    // но addNewWord должен быть приватным, по определению (он используется только внутри класса).
    // Если сделать проверку на isDifficult в родительском классе, тогда я перетягиваю функциональность из дочернего класса
    // в родительский. Что тоже в корне не правильно. Родительский класс ничего не должен знать о дочернем.
    // А если переопределять add в дочернем классе, как сделал я, то это дублирование кода.
    add(word, description) {
        if (!Object.keys(this.allWords).some(key => key === word))
            this.#_addNewWord(word, description);
    }

    #_addNewWord(wordKey, wordObj) {
        this.allWords[wordKey] = {word: wordKey, description: wordObj, isDifficult: true};
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
