const add = (a, b) => {
  // console.log(arguments);
  return a +b;
}

console.log(add(55,1, 1001));

const user = {
  name: "Roger",
  cities: ["new york", "Madison", "san miguel"],
  printPlacesLived(){
    console.log(this.name);
    console.log(this.cities);

    return this.cities.map((city) => this.name + " has lived in " +city);

    // this.cities.forEach((city) => {
    //   console.log(this.name + " has lived in: " + city);
    // });
  }
}

console.log(user.printPlacesLived());


//challenge area

const multiplier = {
  number: [1, 2, 3, 4],
  multiplyBy:  5,
  multiply(){
    return this.number.map((n) => n * this.multiplyBy);
  }
};

console.log(multiplier.multiply());
