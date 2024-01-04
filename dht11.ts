/**
 * MakeCode editor extension for DHT11 and DHT22 humidity/temperature sensors
 * by PKS
 */

namespace SmartCity {
    export enum On_Off {
        //% block="off"
        off = 0,
        //% block="on"
        on = 1
    }

    export enum DHT11dataType {
        //% block="temperature"
        temperature,
        //% block="humidity"
        humidity
    }

    export enum  unitType {
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches,
        //% block="μs"
        MicroSeconds
    }

    let temp = 0
    let temp_pin = 0
    let _temperature: number = -999.0
    let _humidity: number = -999.0
    let _readSuccessful: boolean = false

    let _firsttime: boolean = true
    let _last_successful_query_temperature: number = 0
    let _last_successful_query_humidity: number = 0
    

    //% block="Get DHT11 at pin %dataPin|"
    function dht11_queryData(dataPin: DigitalPin) {
        if (_firsttime == true) {
            _firsttime = false
            dht11_queryData(dataPin)
        }
        //initialize
        let startTime: number = 0
        let endTime: number = 0
        let checksum: number = 0
        let checksumTmp: number = 0
        let dataArray: boolean[] = []
        let resultArray: number[] = []
        for (let index = 0; index < 40; index++) dataArray.push(false)
        for (let index = 0; index < 5; index++) resultArray.push(0)
        _humidity = 0
        _temperature = 0
        _readSuccessful = false


        //request data
        pins.digitalWritePin(dataPin, 0) //begin protocol
        basic.pause(18)
        pins.setPull(dataPin, PinPullMode.PullUp) //pull up data pin if needed
        pins.digitalReadPin(dataPin)
        control.waitMicros(40)
        if (pins.digitalReadPin(dataPin) == 1) {
            //if no respone,exit the loop to avoid Infinity loop
            pins.setPull(dataPin, PinPullMode.PullNone) //release pull up
        }
        else {
            pins.setPull(dataPin, PinPullMode.PullNone) //release pull up
            while (pins.digitalReadPin(dataPin) == 0); //sensor response
            while (pins.digitalReadPin(dataPin) == 1); //sensor response
            //---------------V2--------------------
            //read data (5 bytes)
            if (control.ramSize() > 20000) {
                for (let index = 0; index < 40; index++) {
                    startTime = input.runningTimeMicros();
                    while (pins.digitalReadPin(dataPin) == 1) {
                        endTime = input.runningTimeMicros()
                        if ((endTime - startTime) > 150) { break; }
                    };
                    while (pins.digitalReadPin(dataPin) == 0) {
                        endTime = input.runningTimeMicros()
                        if ((endTime - startTime) > 150) { break; }
                    };
                    control.waitMicros(28)
                    //if sensor pull up data pin for more than 28 us it means 1, otherwise 0
                    if (pins.digitalReadPin(dataPin) == 1) dataArray[index] = true
                }
            }
			/*----------------V1------------*/
            else if (control.ramSize() < 20000) {
                for (let index = 0; index < 40; index++) {
                    while (pins.digitalReadPin(dataPin) == 1);
                    while (pins.digitalReadPin(dataPin) == 0);
                    control.waitMicros(28)
                    //if sensor still pull up data pin after 28 us it means 1, otherwise 0
                    if (pins.digitalReadPin(dataPin) == 1) dataArray[index] = true
                }
            }

            //convert byte number array to integer
            for (let index = 0; index < 5; index++)
                for (let index2 = 0; index2 < 8; index2++)
                    if (dataArray[8 * index + index2]) resultArray[index] += 2 ** (7 - index2)

            //verify checksum
            checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
            checksum = resultArray[4]
            if (checksumTmp >= 512) checksumTmp -= 512
            if (checksumTmp >= 256) checksumTmp -= 256
            if (checksum == checksumTmp) _readSuccessful = true

            //read data if checksum ok
            if (_readSuccessful) {
                _humidity = resultArray[0] + resultArray[1] / 100
                _temperature = resultArray[2] + resultArray[3] / 100

                _last_successful_query_humidity = _humidity
                _last_successful_query_temperature = _temperature
            } else {
                _humidity = _last_successful_query_humidity
                _temperature = _last_successful_query_temperature
            }
        }
        //wait 1.5 sec after query 
        basic.pause(1500)
    }

    //% block="DHT11 Read %dht11data| at pin %dht11pin|"
    //% weight=150
    export function readData(dht11data: DHT11dataType, dht11pin: DigitalPin): number {
        // querydata
        dht11_queryData(dht11pin)

        return (dht11data == DHT11dataType.temperature) ? Math.round(_temperature) : Math.round(_humidity)
    }


}

