export interface ReportData {
    repoId:number,
    userId: number,
    language: string,
    productionScore: number,
    securityAlerts: [string],
    missingFiles: [string],
    deploymentTip: string,
    optimizationTips: string,
    generatedFiles: {
        dockerfile: string,
        cicd: string
    },
    securityHeatmap: {
        secrets: number,
        cors: number,
        headers: number
    },
    costAnalysis: {
        estimatedMonthly: number,
        tier: string,
        reason: string
    },
    resourceOptimizer: {
        explanation: string,
        memoryRequest: string,
        cpuRequest: string,
        memoryLimit: string,
        cpuLimit: string

    },
    iacConfigurations: {
        aws: {
            terraformCode: string,
            explanation: string,
            deploymentSteps: [string],
            cloudResources: [string]
        },
        azure: {
            terraformCode: string,
            explanation: string,
            deploymentSteps: [string],
            cloudResources: [string]
        },
        gcp: {
            terraformCode: string,
            explanation: string,
            deploymentSteps: [string],
            cloudResources: [string]
        }
    },
    createdAt: string
};