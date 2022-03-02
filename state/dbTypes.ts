export enum INVITATION_STATUS {
    ACCEPTED =  'ACCEPTED',
    DECLINED =  'DECLINED',
    IDLE = 'IDLE'
}

type Participant = {
    id: string;
    email: string;
    status: INVITATION_STATUS
}

export type Alert = {
    owner: string;
    participants: Participant[]
}