declare module "socket.io" {
    import { Server as HttpServer } from "http";
    import { Server as HttpsServer } from "https";
  
    export class Server {
      constructor(server: HttpServer | HttpsServer, options?: any);
      // Add more declarations as needed
      on(event: string, listener: (...args: any[]) => void): this;
      emit(event: string, ...args: any[]): boolean;
    }
  }