describe("createGeneration", function() {

  it("returns an array", function() {
    var result = createGeneration();
    expect(Array.isArray(result)).toBe(true);
    // expect(result).toEqual(jasmine.any(Array));
  });

  it("creates an 2D array", function() {
    var result = createGeneration(3, 5);
    expect(result.length).toBe(5);
    expect(result[0].length).toBe(3);
  });

  it("fills each room with 1 or 0", function() {
    var generation = createGeneration(2, 3);
    for(var y = 0; y < 3; y++) {
      for(var x = 0; x < 2; x++) {
        var cell = generation[y][x];
        var result = cell === 0 || cell === 1;
        expect(result).toBe(true);
      }
    }
  });

});

describe("nextCellState", function() {

  it("returns an integer", function() {
    var cells = [1, 1, 1, 0, 0, 0, 0, 0, 0];
    var result = nextCellState(cells);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("returns 1 when it'll be alive", function() {
    var cells = [
      [1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 1, 0]];
    for(var i = 0; i < cells.length; i++) {
      expect(nextCellState(cells[i])).toBe(1);
    }
  });

  it("returns 0 when it'll be dead", function() {
    var cells = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0]];
    for(var i = 0; i < cells.length; i++) {
      expect(nextCellState(cells[i])).toBe(0);
    }
  });

  it("returns current state as next state", function() {
    var cells = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 1, 0, 0]];
    expect(nextCellState(cells[0])).toBe(0);
    expect(nextCellState(cells[1])).toBe(1);
  });

});

describe("extractNeighborhood", function() {

  beforeEach(function() {
    this.generation = [
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 1, 0]];
  });

  it("returns an array", function() {
    var result = extractNeighborhood(this.generation, 1, 1);
    expect(Array.isArray(result)).toBe(true);
  });

  it("returns the neighborhood of a cell at x, y", function() {
    var x = 1,
        y = 1,
        result = extractNeighborhood(this.generation, x, y);

    expect(result).toEqual([0, 1, 0, 1, 0, 1, 0, 1, 1]);
  });

  describe("returns the neighborhood of a border's cell", function() {
    it("x=2, y=0", function() {
      var x = 2,
          y = 0,
          result = extractNeighborhood(this.generation, x, y);
      expect(result).toEqual([1, 1, 0, 1, 0, 1, 0, 1, 0]);
    });

    it("x=2, y=2", function() {
      var x = 2,
          y = 2,
          result = extractNeighborhood(this.generation, x, y);
      expect(result).toEqual([0, 1, 0, 1, 1, 0, 1, 0, 1]);
    });

    it("x=0, y=1", function() {
      var x = 0,
          y = 1,
          result = extractNeighborhood(this.generation, x, y);
      expect(result).toEqual([1, 0, 1, 0, 1, 0, 0, 0, 1]);
    });

    it("x=3, y=1", function() {
      var x = 3,
          y = 1,
          result = extractNeighborhood(this.generation, x, y);
      expect(result).toEqual([0, 1, 0, 1, 0, 1, 1, 0, 0]);
    });
  });

  describe("returns the neighborhood of a corner's cell", function() {
    it("x=0, y=0", function() {
      var x = 0,
          y = 0,
          result = extractNeighborhood(this.generation, x, y);
      expect(result).toEqual([0, 0, 1, 1, 0, 1, 0, 1, 0]);
    });

    it("x=3, y=0", function() {
      var x = 3,
          y = 0,
          result = extractNeighborhood(this.generation, x, y);
      expect(result).toEqual([1, 0, 0, 0, 1, 0, 1, 0, 1]);
    });

    it("x=0, y=2", function() {
      var x = 0,
          y = 2,
          result = extractNeighborhood(this.generation, x, y);
      expect(result).toEqual([0, 1, 0, 0, 0, 1, 1, 0, 1]);
    });

    it("x=3, y=2", function() {
      var x = 3,
          y = 2,
          result = extractNeighborhood(this.generation, x, y);
      expect(result).toEqual([1, 0, 1, 1, 0, 0, 0, 1, 0]);
    });
  });

});
