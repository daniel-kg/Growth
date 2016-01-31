var expect = require("chai").expect;
var reactor = require("../lib/reactor");

describe("Reactor", function() {
    describe("registerEvent", function() {
        it("add an event", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event");

            expect(testReactor._eventsDict).to.have.keys('test_event');
            expect(testReactor._eventsDict["test_event"]).to.be.empty;
        });
        it("add two events", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event1");
            testReactor.registerEvent("test_event2");

            expect(testReactor._eventsDict).to.have.keys('test_event1', 'test_event2');
            expect(testReactor._eventsDict["test_event1"]).to.be.empty;
            expect(testReactor._eventsDict["test_event2"]).to.be.empty;
        });
      });
    describe("deregisterEvent", function() {
        it("add and deregister an event", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event");

            expect(testReactor._eventsDict).to.have.keys('test_event');
            expect(testReactor._eventsDict["test_event"]).to.be.empty;

            testReactor.deRegisterEvent("test_event");
            expect(testReactor._eventsDict).to.not.have.keys('test_event');

        });
        it("add two events deregister one event", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event1");
            testReactor.registerEvent("test_event2");

            expect(testReactor._eventsDict["test_event1"]).to.be.empty;
            expect(testReactor._eventsDict["test_event2"]).to.be.empty;

            testReactor.deRegisterEvent('test_event1');
            expect(testReactor._eventsDict).to.not.have.keys('test_event1');
            expect(testReactor._eventsDict).to.have.keys('test_event2');

            testReactor.deRegisterEvent('test_event2');
            expect(testReactor._eventsDict).to.not.have.keys('test_event1', 'test_event2');
        });
      });

    describe("addCallback", function() {
        it("add a callback", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event");

            testReactor.addCallback("test_event", "potato")

            expect(testReactor._eventsDict['test_event']).to.contain('potato');
            expect(testReactor._eventsDict['test_event'].length).to.equal(1);
        });
        it("add two callbacks to one event", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event");

            testReactor.addCallback("test_event", "potato")
            testReactor.addCallback("test_event", "squash")

            expect(testReactor._eventsDict['test_event']).to.include('potato');
            expect(testReactor._eventsDict['test_event']).to.include('squash');
            expect(testReactor._eventsDict['test_event'].length).to.equal(2);
        });
        it("add two callbacks to two separate events", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event1");
            testReactor.registerEvent("test_event2");

            testReactor.addCallback("test_event1", "potato")
            testReactor.addCallback("test_event2", "squash")

            expect(testReactor._eventsDict['test_event1']).to.contain('potato');
            expect(testReactor._eventsDict['test_event1'].length).to.equal(1);

            expect(testReactor._eventsDict['test_event2']).to.contain('squash');
            expect(testReactor._eventsDict['test_event2'].length).to.equal(1);
        });
    });

    describe("removeCallback", function() {
        it("remove a callback", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event");

            testReactor.addCallback("test_event", "potato")

            expect(testReactor._eventsDict['test_event']).to.contain('potato');

            testReactor.removeCallback("test_event", "potato")
            expect(testReactor._eventsDict['test_event']).to.be.empty;


        });
        it("don't crash on removing an unadded callback", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event");

            testReactor.removeCallback("test_event", "potato")
            expect(testReactor._eventsDict['test_event']).to.be.empty;


        });
        it("remove two callbacks on one event", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event");

            testReactor.addCallback("test_event", "potato")
            testReactor.addCallback("test_event", "squash")

            expect(testReactor._eventsDict['test_event']).to.include('potato');
            expect(testReactor._eventsDict['test_event']).to.include('squash');

            testReactor.removeCallback("test_event", "potato")

            expect(testReactor._eventsDict['test_event'].length).to.equal(1);
            expect(testReactor._eventsDict['test_event']).to.include('squash');

            testReactor.removeCallback("test_event", "squash")
            expect(testReactor._eventsDict['test_event']).to.be.empty;
        });
        it("remove two callbacks on two separate events", function() {
            testReactor = new reactor.Reactor();
            testReactor.registerEvent("test_event1");
            testReactor.registerEvent("test_event2");

            testReactor.addCallback("test_event1", "potato");
            testReactor.addCallback("test_event2", "squash");

            expect(testReactor._eventsDict['test_event1']).to.contain('potato');
            expect(testReactor._eventsDict['test_event2']).to.contain('squash');

            testReactor.removeCallback("test_event1", "potato");
            expect(testReactor._eventsDict['test_event1']).to.be.empty;

            testReactor.removeCallback("test_event2", "squash");
            expect(testReactor._eventsDict['test_event2']).to.be.empty;

        });
      });
});
