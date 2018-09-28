import IpfsApi from '@/services/IpfsApi'
import MultichainApi from '@/services/MultichainApi'

export default {
    setConfigIpfs(apiPort, gatewayPort, swarmPort) {
        return IpfsApi().post('setIpfsPort',{
            api_port: apiPort,
            gateway_port: gatewayPort,
            swarm_port: swarmPort
        })
    },

    setConfigMultichain(networkPort, RPCPort) {
        return MultichainApi().post('setPort', {
            network_port: networkPort,
            rpc_port: RPCPort
        })
    },

    createBlockchain(blockchainName) {
        return MultichainApi().post('createBlockchain', {
            blockchain_name: blockchainName
        })
    }
}