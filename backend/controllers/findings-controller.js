const Engagement = require('../models/Engagement')
const Vulnerability = require('../models/Vulnerability')

module.exports.getFindings = async (req, res) => {
    try {
        const engagement = await Engagement.findById(req.params.engagementId)
        return res.json(engagement?.findings)
    } catch (e) {
        console.log(e)
        return res.json({error: "An error occured"}).status(500)
    }   
}

module.exports.createFinding = async (req, res) => {
    try {
        const { findingIdentifier=undefined, title=undefined} = req.body;
        if (!findingIdentifier || !title) return res.json({error: "'findingIdentifier' and 'title' are required."})
        
        const engagement = await Engagement.findById(req.params.engagementId)
        let findings = engagement.findings
        
        findings.push({
            findingIdentifier,
            title
        })

        const updatedDocument = await Engagement.findByIdAndUpdate(req.params.engagementId, {
            findings
        }, {
            new: true
        })

        return res.json(updatedDocument.findings)
    } catch (e) {
        return res.json({error: "An error occured"}).status(500)
    }
}

module.exports.importVulnerability = async (req, res) => {
    try {
        const { findingIdentifier=undefined, vulnerabilityId=undefined} = req.body;
        if (!findingIdentifier || !vulnerabilityId) return res.json({error: "'findingIdentifier' and 'vulnerabilityId' are required."})
        
        const engagement = await Engagement.findById(req.params.engagementId)
        let findings = engagement.findings
        
        let newFinding = await Vulnerability.findById(vulnerabilityId).lean()
        newFinding.findingIdentifier = findingIdentifier
        
        findings.push(newFinding)

        const updatedDocument = await Engagement.findByIdAndUpdate(req.params.engagementId, {
            findings
        }, {
            new: true
        })

        return res.json(updatedDocument.findings)
    } catch (e) {
        return res.json({error: "An error occured"}).status(500)
    }
}