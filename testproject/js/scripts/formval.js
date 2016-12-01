/**
 * Copyright (c) 2015, AISystemsDesign, aisystemsdesign.com
 * All rights reserved.
 *
 * jQuery Form Validation Handler - version 1.0.0
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *	* Redistributions of source code must retain the above copyright
 *	  notice, this list of conditions and the following disclaimer.
 *
 *	* Redistributions in binary form must reproduce the above
 *	  copyright notice, this list of conditions and the following
 *	  disclaimer in the documentation and/or other materials provided
 *	  with the distribution.
 *
 *	* Neither the names of AISystemsDesign or aisystemsdesign.com, nor
 *	  the names of its contributors may be used to endorse or promote
 *	  products derived from this software without specific prior
 *	  written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */

/*
 * This is a BSD License approved by the Open Source Initiative (OSI).
 * See:  http://www.opensource.org/licenses/bsd-license.php
 */

// Begin Event Handlers --------------------------------------------------------

$(document).ready(function()
{
// Enter Default Messages
var reqmsg = 'This is a required field.';
var valemailmsg = 'Please enter a valid email address.';
var valphonemsg = 'Please enter a valid phone number.';
var valnumericmsg = 'This field must contain numbers only.';
var valcharlenmsg = 'Please enter a valid value.';
var valenummsg = 'Please enter a valid value.';
var valforbidmsg = 'Field must contain alphanumeric characters only.';

var validatestatus = true;

// *** No Changes Needed Below This Line *** -----------------------------------

  $('form').submit(function(event)
  {
    validatestatus = true;
    $('#'+this.id+' *').each(function(index,element)
    {
      // Begin Required
      if(element.hasAttribute('data-req') == true && validatestatus == true)
      {
        if(element.type == 'radio')
        {
          var tmpradiostatus = false;
          $('input[name='+element.name+']:radio').each(function(key,value)
          {
            if(value.checked == true)
            {
              tmpradiostatus = true;
            }
          });
          if(tmpradiostatus != true)
          {
            validatestatus = false;
          }
        }
        if(element.type == 'checkbox')
        {
          var tmpcheckboxcounter = 0;
          var tmpcheckboxrequired = element.getAttribute('data-req');
          if(tmpcheckboxrequired.length >= 1)
          {
            $('input[name="'+element.name+'"]:checkbox').each(function(key,value)
            {
              if(value.checked == true)
              {
                tmpcheckboxcounter++;
              }
            });
            if(tmpcheckboxcounter < tmpcheckboxrequired)
            {
              validatestatus = false;
            }
          }
          else
          {
            if(element.checked != true)
            {
              validatestatus = false;
            }
          }
        }
        if(element.type != 'checkbox' && element.type != 'radio')
        {
          var required = new Array();
          required.value = element.value;
          if(element.hasAttribute('placeholder') == true)
          {
            if(element.getAttribute('placeholder') == required.value)
            {
              validatestatus = false;
            }
          }
          if(valRequired(required) == false)
          {
            validatestatus = false;
          }
        }
        if(validatestatus == false)
        {
          $(this).attr("title",element.getAttribute('data-reqmsg'));
          //$('body').tooltip({selector : '.has-tip',trigger : 'focus'});
          alert(element.getAttribute('data-reqmsg'));
          event.preventDefault();
          element.focus();
        }
      }
      // Begin Validate Email
      if(element.hasAttribute('data-valemail') == true && validatestatus == true)
      {
        var email = new Array();
        email.value = element.value;
        if(valEmail(email) == false)
        {
          validatestatus = false;
          $(this).attr("title",element.getAttribute('data-reqmsg'));
          //$('body').tooltip({selector : '.has-tip',trigger : 'focus'});
          alert(element.getAttribute('data-reqmsg'));
          event.preventDefault();
          element.focus();
        }
      }
      // Begin Validate Phone
      if(element.hasAttribute('data-valphone') == true && validatestatus == true)
      {
        var phone = new Array();
        phone.value = element.value;
        if(valPhone(phone) == false)
        {
          validatestatus = false;
          $(this).attr("title",element.getAttribute('data-reqmsg'));
          //$('body').tooltip({selector : '.has-tip',trigger : 'focus'});
          alert(element.getAttribute('data-reqmsg'));
          event.preventDefault();
          element.focus();
        }
      }
      // Begin Validate Numeric
      if(element.hasAttribute('data-valnumeric') == true && validatestatus == true)
      {
        var numeric = new Array();
        numeric.value = element.value;
        if(valNumeric(numeric) == false)
        {
          validatestatus = false;
          $(this).attr("title",element.getAttribute('data-reqmsg'));
          //$('body').tooltip({selector : '.has-tip',trigger : 'focus'});
          alert(element.getAttribute('data-reqmsg'));
          event.preventDefault();
          element.focus();
        }
      }
      // Begin Character Length
      if(element.hasAttribute('data-valcharlen') == true && validatestatus == true)
      {
        var charlen = new Array();
        charlen.value = element.value;
        if(element.getAttribute('data-valcharlen').indexOf('-') != -1)
        {
          charlen.type = 'range';
          var charlengettype = element.getAttribute('data-valcharlen').split('-');
          charlen.min = charlengettype[0];
          charlen.max = charlengettype[1];
        }
        else
        {
          charlen.type = 'enum';
          charlen.list = element.getAttribute('data-valcharlen').split(',');
        }
        if(valCharLen(charlen) == false)
        {
          validatestatus = false;
          $(this).attr("title",element.getAttribute('data-reqmsg'));
          //$('body').tooltip({selector : '.has-tip',trigger : 'focus'});
          alert(element.getAttribute('data-reqmsg'));
          event.preventDefault();
          element.focus();
        }
      }
      // Begin Validate Enumeration
      if(element.hasAttribute('data-valenum') == true && validatestatus == true)
      {
        var enumerate = new Array();
        enumerate.value = element.value;
        enumerate.list = element.getAttribute('data-valenum').split(',');
        if(valEnum(enumerate) == false)
        {
          validatestatus = false;
          $(this).attr("title",element.getAttribute('data-reqmsg'));
          //$('body').tooltip({selector : '.has-tip',trigger : 'focus'});
          alert(element.getAttribute('data-reqmsg'));
          event.preventDefault();
          element.focus();
        }
      }
      // Begin Forbidden Characters
      if(element.hasAttribute('data-valforbid') == true && validatestatus == true)
      {
        var forbidden = new Array();
        forbidden.value = element.value;
        forbidden.fvalues = element.getAttribute('data-valforbid');
        if(valForbid(forbidden) == false)
        {
          validatestatus = false;
          $(this).attr("title",element.getAttribute('data-reqmsg'));
          //$('body').tooltip({selector : '.has-tip',trigger : 'focus'});
          alert(element.getAttribute('data-reqmsg'));
          event.preventDefault();
          element.focus();
        }
      }


    });
  });
// End Event Handlers ----------------------------------------------------------

});
