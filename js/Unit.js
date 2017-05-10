function Unit(code, name, faculty, synposis, preqs, proh) {
    this.code = code;
    this.name = name;
    this.faculty = faculty;
    this.synposis = synposis;
    this.preqs = preqs;
    this.coreqs = "";
    this.proh = proh;

    this.creditPoints = 6;
    this.scaBand = 2;
    this.eftsl = 0.125;
}

Unit.prototype.serialise = function() {
    return this.code;
};

Unit.deserialise = function(serialised) {
    return new Unit(serialised);
};
