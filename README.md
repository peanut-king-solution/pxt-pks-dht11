
# Smarthon-smartcity-kit

A PXT library for Smarthon Smart City IoT Starter kit

## About Smarthon Smart City IoT Starter Kit

Smarthon Smart City IoT Starter kit is designed to introduce Internet of things (IoT). With basic knowledge of computing knowledge and electronics provided in the kit, you can be a city creator and build a unique IoT system in the city. Based on Smarthon IoT board, which is compatible with multiple sensors and actuators, you can design city features; for example: using sensors to detect traffic status and upload city information to the internet.

More product information at https://www.smarthon.cc/micro-bit-smart-city-kit

## Component List

* Smarthon WiFi extension board
* Traffic Light module
* White LED light
* Multi-Colour LED (WS2812)
* 180ᵒ Servo
* Buzzer
* Ultrasonic Distance Sensor
* Light Sensor
* Temperature, Humidity sensor
* PIR Motion Sensor
* Raindrop sensor
* Noise sensor (Sound)

## Example Tutorial

### 1. Show the light sensor reading
The light sensor will return the value of luminance in environment<P>
Maxmium:100<BR>
Minmium:0<BR>
  
```block
basic.showNumber(SmartCity.read_light_sensor(AnalogPin.P0))
```

### 2. Show the Raindrop sensor reading
The Raindrop sensor will return the water amount on the plane to detect the raindrop<P>
Maxmium:100<BR>
Minmium:0<BR>
  
```block
basic.showNumber(SmartCity.read_raindrop_sensor(AnalogPin.P0))
```

### 3. Show the Noise sensor reading
Theh Noise sensor will return the Noise level from the environment<P>
Maxmium:100<BR>
Minmium:0<BR>

```block
basic.showNumber(SmartCity.read_sound_sensor(AnalogPin.P0))
```

### 4. Show the DHT11 temperature and humidity sensor reading
The DHT11 sensor will return the temperature and humidity in environment<P>
  <B>For Temperature</B><BR>
Maxmium:50 Celsius degree<BR>
Minmium:0 Celsius degree<P>
  <B>For Humidity</B><BR>
Maxmium:80%<BR>
Minmium:20%<BR>
  
```block
basic.showNumber(SmartCity.readData(SmartCity.DHT11dataType.temperature, DigitalPin.P0))
```

### 5. Show the distance sensor reading
The Distance sensor will return the distance between sensor and object<P>
>Maxmium:4M<BR>
>Minmium:3cm<BR>
  
```block
basic.showNumber(SmartCity.read_distance_sensor(SmartCity. unitType.Centimeters, DigitalPin.P14, DigitalPin.P15))

```
### 6. Get the motion sensor detection result

The motion sensor will return the motion changing at the front<P>
  
```block
if (SmartCity.read_motion_sensor(AnalogPin.P0)) {
    basic.showIcon(IconNames.Heart)
} else {
    basic.showIcon(IconNames.Sad)
}
```

### 7. Control traffic light

The traffic light have three led, you may control the led on/off seperartly.<P>

In example,<BR>
turn on three led and wait for 1s, then turn off the leds.<BR>
  
```block
SmartCity.control_traffic_light(
true,
true,
true,
AnalogPin.P0
)
basic.pause(1000)
SmartCity.control_traffic_light(
false,
false,
false,
AnalogPin.P0
)
```

### 8. Control the LED
You can control the on/off of led, or adjust to specific brightness.<BR>

```block
SmartCity.turn_white_led(0, AnalogPin.P0)
```

### 9. Control the servo
You can control the servo rotate to specific degree 

```block
SmartCity.turn_servo(0, AnalogPin.P0)
```


## License

MIT

## Supported targets

* for PXT/calliope
* for PXT/microbit

(The metadata above is needed for package search.)
