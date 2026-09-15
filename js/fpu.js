class FPU {
    constructor() {
        this.fp0 = 0.0;
        this.fp1 = 0.0;
        this.result = 0.0;
        this.status = 0;
    }

    writePort(port, value) {
        switch (port) {
            case 0x0A: this.fp0 = value; break;        
            case 0x0B: this.fp1 = value; break;      
            case 0x0C: this.executeOp(value); break;
        }
    }


    readPort(port) {
        switch (port) {
            case 0x0D: return Math.floor(this.result) & 0xFF; 
            case 0x0E: return this.status;                     
        }
    }

    executeOp(op) {
        this.status = 0;
        switch (op) {
            case 0x01: this.result = this.fp0 + this.fp1; break;
            case 0x02: this.result = this.fp0 - this.fp1; break;
            case 0x03: this.result = this.fp0 * this.fp1; break;
            case 0x04: 
                if (this.fp1 !== 0) {
                    this.result = this.fp0 / this.fp1;
                } else {
                    this.result = 0;
                    this.status = 1;
                }
                break;
            default: this.status = 1; break;
        }
    }

    reset() {
        this.fp0 = 0.0;
        this.fp1 = 0.0;
        this.result = 0.0;
        this.status = 0;
    }
}