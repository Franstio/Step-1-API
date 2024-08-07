import { SerialPort } from 'serialport';

const Timbangan = new SerialPort({
    path: '/dev/ttyUSB1',
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
});

const Timbangan_1 = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
}); 

Timbangan.on('error', (error) => {
});

let _4kgOutput = '';
let _50kgOutput = '';
export const getScales4Kg = (io) => {
    try {
        
        let response;
        io.on('connectScale', () => {
            Timbangan.open(() => {
            });
        });
       Timbangan.on('data', (data) => {
            _4kgOutput = data.toString();
            _4kgOutput = _4kgOutput.replace("\n","").replace("\r","");
            const match = _4kgOutput.toString().match(/WT:(\d+\.\d+)g/);
            if (match) {
                const weight = match[1];
                response = { weight: parseFloat(weight) };
                io.emit('data', response);
                
            }
            _4kgOutput = '';
        });  
    } catch (error) {
        //        res.status(500).json({ msg: error.message });
    } 
};

export const getScales50Kg = (io) => {
    try {
        let response;
         setInterval(function(){
             response = { weight50Kg: 20 };
             io.emit('data', response);
         },5000); */
        io.on('connectScale', () => {
            Timbangan_1.open(() => {
            });
        });
        Timbangan_1.on('data', (data) => {
            /*if (data.toString()!='\n')
            {
                _50kgOutput = _50kgOutput+ data.toString();
                return;
            }*/
            _50kgOutput = data.toString().replace("\r","").replace("\n","");
            const match = _50kgOutput.toString().match(/[\d]+\.\d{2}(?=Kg)/);

            if (match) {
                const weight = match[0];
                response = { weight: parseFloat(weight) };
                response = { weight50Kg: weight };
                io.emit('data1', response);
            }
            _50kgOutput = '';
        });

       Timbangan_1.on('error', (error) => {
        }); 
        if (response != undefined && response != null) {
            res.status(200).json(response);
        }
    } catch (error) {
        //    res.status(500).json({ msg: error.message });
    }
};
