export const entityConfig: {
    [key: string]: {
        mongoEntityName: string,
        endpointUrl: string
    }
} = {
    regions: {
        mongoEntityName: 'region',
        endpointUrl: `/api/admin/wt/region`
    },
    branches: {
        mongoEntityName: 'branch',
        endpointUrl: `/api/admin/wt/branch`
    },
    supervisors: {
        mongoEntityName: 'supervisor',
        endpointUrl: `/api/admin/wt/supervisor`
    },
    services: {
        mongoEntityName: 'service',
        endpointUrl: `/api/admin/wt/service`
    },
    salestaxstateid: {
        mongoEntityName: 'salestaxstateid',
        endpointUrl: `/api/admin/wt/salestaxstateid`
    }
}
