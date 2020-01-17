input.onButtonPressed(Button.B, function () {
    if (frog.get(LedSpriteProperty.X) == 4) {
        game.addScore(1)
        frog.set(LedSpriteProperty.X, 0)
    } else {
        frog.change(LedSpriteProperty.X, 1)
        if (frog.isTouching(cars[frog.get(LedSpriteProperty.X)])) {
            game.gameOver()
        }
    }
})
input.onButtonPressed(Button.A, function () {
    frog.change(LedSpriteProperty.X, -1)
    if (frog.isTouching(cars[frog.get(LedSpriteProperty.X)])) {
        game.gameOver()
    }
})
let currentCar: game.LedSprite = null
let cars: game.LedSprite[] = []
let frog: game.LedSprite = null
frog = game.createSprite(0, 4)
frog.set(LedSpriteProperty.Blink, 300)
cars = [game.createSprite(0, 0), game.createSprite(1, 0), game.createSprite(2, 0), game.createSprite(3, 0), game.createSprite(4, 0)]
for (let car of cars) {
    car.set(LedSpriteProperty.Brightness, 0)
    car.delete()
}
basic.forever(function () {
    basic.pause(700)
    for (let Index = 0; Index <= 4; Index++) {
        currentCar = cars[Index]
        if (currentCar.get(LedSpriteProperty.Y) == 4) {
            currentCar.set(LedSpriteProperty.Brightness, 0)
            currentCar.delete()
        }
        if (currentCar.get(LedSpriteProperty.Brightness) == 0 && Math.randomRange(0, 5) == 0) {
            currentCar = game.createSprite(Index, 0)
            currentCar.turn(Direction.Right, 90)
            cars[Index] = currentCar
        } else {
            if (currentCar.get(LedSpriteProperty.Brightness) > 0) {
                currentCar.move(1)
            }
        }
        if (currentCar.isTouching(frog)) {
            game.gameOver()
        }
    }
})
