const rules = {
    admin: {
        static: [
            'dashboard-page:visual',
            'clients-section:visual',
            'clients-page:visual',
            'clients:actions',
            'clients:create',
            'clients:edit',
            'clients:remove',
            'payments-section:visual',
            'paymentsClient-page:visual',
            'paymentsClient:create',
            'paymentsClient:edit',
            'paymentsClient:remove',
            'providers-page:visual',
            'providers:actions',
            'providers:create',
            'providers:remove',
            'providers:edit',
            'employies-page:visual',
            'employies-payments:list',
            'employies-payments:create',
            'employies-payments:remove',
            'sellers-page:visual',
            'sellers:actions',
            'sellers:create',
            'sellers:remove',
            'sellers:edit',
            'employies:actions',
            'employies:create',
            'employies:edit',
            'employies:remove',
            'reports-section:visual',
            'graphics-page:visual',
            'movements-page:visual',
            'permission-section:visual',
            'accounts-page:visual',
            'accounts:create',
            'accounts:edit',
            'accounts:remove',
            'profiles-page:visual',
            'profiles:create',
            'profiles:edit',
            'profiles:remove',
            'status-page:visual',
            'check'
        ]
    },
    vendedor: {
        static: [
            'dashboard-page:visual',
            'payments-section:visual',
            'sellers-page:visual',
        ]
    },
    cobranza: {
        static: [
            'dashboard-page:visual',
            'clients-section:visual',
            'clients-page:visual',
            'clients:actions',
            'clients:info',
            'payments-section:visual',
            'payments:create'
        ]
    },
    asistente: {
        static: [
            'dashboard-page:visual',
            'clients-section:visual',
            'clients:actions',
            'payments-section:visual',
            'clients-page:visual',
            'providers-page:visual',
            'providers:list',
            'bills:list',
            'employies-page:visual',
            'employies-payments:list',
            'sellers-page:visual',
            'sellers-payments:list',
            'employies:list',
            'occupations:list',
            'salaries:list',
            'sellers:list',
            'providers:list',
            'reports-section:visual',
            'graphics-page:visual',
            'movements-page:visual',
            'reports:list',
            'reports:create',
            'permission-section:visual',
            'accounts-page:visual'
        ]
    }
}

export default rules