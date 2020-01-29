describe('main.js', function() {
  describe('calculate()', function() {
    it('validates expression when the first number is invalid', function() {
      spyOn(window, 'updateResult').and.stub();

      calculate('a+3');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });
    it('validates expression when secondnumber is invalid', function() {
      spyOn(window, 'updateResult'); // and.stub() is the default, can be omitted

      calculate('3+a');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });
    it('vvalidates expression when opration is invalud', function() {
      spyOn(window, 'updateResult');

      calculate('3_3');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('calls add', function() {
      const spy = spyOn(Calculator.prototype, 'add');

      calculate('3+4');

      expect(spy).toHaveBeenCalled();
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(4);
    });
    it('calls subtract', function() {
      const spy = spyOn(Calculator.prototype, 'subtract');

      calculate('3-7');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(7);
    });
    it('calls multiply', function() {
      const spy = spyOn(Calculator.prototype, 'multiply');

      calculate('3*4');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(4);
    });
    it('calls divide', function() {
      const spy = spyOn(Calculator.prototype, 'divide');

      calculate('3/1');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(1);
    });
    it('calls updateResult (exampleusing and.callThrough)', function() {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callThrough();

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);

    });

    it('calls updateResult (exampleusing and.callFake)', function() {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callFake(function(number){
        return 'it works';
      });

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('it works');

    });
    it('calls updateResult (exampleusing and.callFake)', function() {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] return');

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [multiply] return');

    });
    it('calls updateResult (exampleusing and.returnValues)', function() {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] returns');

      calculate('5+5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [add] returns');
    });
    it('does not handle errors', function() {
      spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

      expect(function() {calculate('5*5')}).toThrowError('some error');

      // expect(window.updateResult).toHaveBeenCalled();
      // expect(window.updateResult).toHaveBeenCalledWith('whatever [multiply] return');

    });
  });

  describe('updateResult()', function() {
    beforeAll(function() {
      // Executed ONCE before all specs inside this suite are executed.
      const element = document.createElement('div');
      element.setAttribute('id', 'result');
      document.body.appendChild(element);

      this.element = element;
    });

    afterAll(function() {
      // Executed ONCE after all specs inside this describe are executed.
      document.body.removeChild(this.element);
    });

    it('adds result to DOM element', function() {
      updateResult('5');

      expect(this.element.innerText).toBe('5');
    });
  });

  describe('showVersion()', function() {
    it('calls calculator.version', function() {
      spyOn(document, 'getElementById').and.returnValue({
        innerText: null
      });

      const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
        Promise.resolve()
      )

      showVersion();

      expect(spy).toHaveBeenCalled();

    });
  });

});
