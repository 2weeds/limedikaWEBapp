import React, { Component } from 'react'

export class Client {
    readonly Id: number;
    readonly ClientName: string;
    readonly ClientAddress: string;
    readonly ClientPostCode: string;
    constructor(Id:number, ClientName:string,ClientAddress:string,ClientPostCode:string){
        this.Id = Id;
        this.ClientName = ClientName;
        this.ClientAddress = ClientAddress;
        this.ClientPostCode = ClientPostCode;
    }
}